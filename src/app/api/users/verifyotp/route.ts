import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, otp } = reqBody;

        console.log("Received Email:", email);
        console.log("Received OTP:", otp);

        if (!email || !otp) {
            return NextResponse.json(
                { error: "Email and OTP are required" },
                { status: 400 }
            );
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        console.log("Stored OTP:", user.forgotPasswordOtp);
        console.log("Stored OTP Expiry:", user.forgotPasswordOtpExpiry);

        // Check if OTP exists
        if (!user.forgotPasswordOtp) {
            return NextResponse.json(
                { error: "OTP not generated or expired" },
                { status: 400 }
            );
        }

        // Check if OTP matches
        if (user.forgotPasswordOtp !== String(otp)) {
            return NextResponse.json(
                { error: "Invalid OTP" },
                { status: 400 }
            );
        }

        // Check if OTP is expired
        const currentTime = new Date();
        if (user.forgotPasswordOtpExpiry && user.forgotPasswordOtpExpiry < currentTime) {
            return NextResponse.json(
                { error: "OTP expired" },
                { status: 400 }
            );
        }

        // Clear OTP after successful verification
        await User.findOneAndUpdate(
            { email },
            { $set: { forgotPasswordOtp: null, forgotPasswordOtpExpiry: null } },
            { new: true }
        );
        

        return NextResponse.json(
            { message: "OTP verified successfully" },
            { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred while verifying otp" }, { status: 500 });
    }
}
