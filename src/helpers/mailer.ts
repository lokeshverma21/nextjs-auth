import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import crypto from "crypto"; // For OTP generation
import {connect} from "@/dbconfig/dbconfig";

connect();

interface SendEmailProps {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId: string;
  }

export const sendEmail = async ({ email, emailType, userId }: SendEmailProps) => {
    try {
        // Configure Mailtrap SMTP
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                // user: process.env.MAILTRAP_USER || "", 
                // pass: process.env.MAILTRAP_PASSWORD || ""
                user: process.env.EMAIL_USER || "", 
                pass: process.env.EMAIL_PASSWORD || ""
            }
        });

        const mailOptions: { from: string; to: string; subject: string; html: string } = {
            from: process.env.EMAIL || "no-reply@example.com",
            to: email,
            subject: "",
            html: ""
        };

        if (emailType === "VERIFY") {
            // Generate hashed token for email verification
            const hashedToken = await bcrypt.hash(userId.toString(), 10);

            // Save token in the database
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000 // 1 hour expiry
            });


            const verifyLink = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`

            // Email content for verification link
            mailOptions.subject = "Verify Your Email";
            mailOptions.html = `
                <body style="word-spacing: normal; background-color: #fafafa">
                    <div style="background-color: #fafafa" lang="und" dir="auto">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
                        <tbody>
                            <tr>
                            <td>
                                <div style="margin: 0px auto; max-width: 600px">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
                                    <tbody>
                                    <tr>
                                        <td style="padding: 16px; text-align: center;">
                                        <div style="background: #ffffff; border-radius: 8px; max-width: 568px; margin: 0px auto; padding: 32px;">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: #ffffff; width: 100%; border-radius: 8px;">
                                            <tbody>
                                                <tr>
                                                <td align="center" style="padding-bottom: 16px;">
                                                    <img alt="Company Logo" src="${process.env.DOMAIN}/lock.png" style="border: 0; display: block; outline: none; text-decoration: none; height: auto; width: 150px;" />
                                                </td>
                                                </tr>
                                                <tr>
                                                <td style="padding: 32px;">
                                                    <h1 style="margin: 16px 0px; text-align: center;">Please confirm your email</h1>
                                                    <p style="text-align: center;">Click on this button to confirm your email and sign up:</p>
                                                    <div style="background-color: #ebe3ff; border-radius: 8px; padding: 16px; text-align: center;">
                                                    <a href="${verifyLink}" class="px-6 py-2 mt-4 text-sm font-medium tracking-wider text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                                        Verify Email
                                                    </a>
                                                    </div>
                                                    <p style="text-align: center; margin-top: 16px;">This code is valid for 1 hour.</p>
                                                        <p class="mt-10 text-gray-600 dark:text-gray-300">
                                                            If the button doesn't work, use this link: <br>
                                                            <a href="${verifyLink}" class="text-blue-600 hover:underline dark:text-blue-400">${verifyLink}</a>
                                                        </p>
                                                    <p style="text-align: center; margin-top: 16px; font-size: 14px; color: #555;">If you didn’t request this link, please ignore this email.</p>
                                                    <br/>
                                                    <p style="text-align: center; margin-top: 16px; font-size: 14px; color: #555;">Thanks 😊</p>
                                                </td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </body>
            `;
        } else if (emailType === "RESET") {
            // Generate OTP
            const otp = crypto.randomInt(100000, 999999).toString();
            const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

            console.log("Generated OTP:", otp);

            // Find user first
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("User not found in the database");
            }

            // Update user with OTP
            const updatedUser = await User.findByIdAndUpdate(userId, {
                forgotPasswordOtp: otp,
                forgotPasswordOtpExpiry: Date.now() + 10 * 60 * 1000 // 10 min expiry
            });

            console.log("Updated User after OTP:", updatedUser);
            console.log("Stored OTP in DB:", updatedUser?.forgotPasswordOtp);

            // Email content for OTP
            mailOptions.subject = "Password Reset OTP";
            mailOptions.html = `
                <body style="word-spacing: normal; background-color: #fafafa">
                    <div style="background-color: #fafafa" lang="und" dir="auto">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
                        <tbody>
                            <tr>
                            <td>
                                <div style="margin: 0px auto; max-width: 600px">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
                                    <tbody>
                                    <tr>
                                        <td style="padding: 16px; text-align: center;">
                                        <div style="background: #ffffff; border-radius: 8px; max-width: 568px; margin: 0px auto; padding: 32px;">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: #ffffff; width: 100%; border-radius: 8px;">
                                            <tbody>
                                                <tr>
                                                <td align="center" style="padding-bottom: 16px;">
                                                    <img alt="Company Logo" src="${process.env.DOMAIN}/lock.png" style="border: 0; display: block; outline: none; text-decoration: none; height: auto; width: 150px;" />
                                                </td>
                                                </tr>
                                                <tr>
                                                <td style="padding: 32px;">
                                                    <h1 style="margin: 16px 0px; text-align: center;">Please confirm your email</h1>
                                                    <p style="text-align: center;">Use this code to confirm your email and reset your password:</p>
                                                    <div style="background-color: #ebe3ff; border-radius: 8px; padding: 16px; text-align: center;">
                                                    <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 0;">${otp}</p>
                                                    </div>
                                                    <p style="text-align: center; margin-top: 16px;">This code is valid for ${otpExpiry} minutes.</p>
                                                    <p style="text-align: center; margin-top: 16px; font-size: 14px; color: #555;">If you didn’t request this code, please ignore this email.</p>
                                                    <br/>
                                                    <p style="text-align: center; margin-top: 16px; font-size: 14px; color: #555;">Thanks 😊</p>
                                                </td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </body>
            `;
        } else {
            throw new Error("Invalid emailType provided");
        }

        // Send the email
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error) {
        console.error("Error sending email:", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
    }
};
