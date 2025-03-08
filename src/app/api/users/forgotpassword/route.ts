import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import {connect} from "@/dbconfig/dbconfig";

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
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred in forgot password" }, { status: 500 });
    }
}