import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import {connect} from "@/dbconfig/dbconfig";
import { error } from "console";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();

        const {email} = reqBody;

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({error: "User does not exist"},{status:404})
        }

        await sendEmail({email,emailType:"RESET", userId: user._id})

        return NextResponse.json({
            message: "Email sent successfully!!",
            success: true,
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 400
            }
        )
    }
}