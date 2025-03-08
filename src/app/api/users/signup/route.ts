import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import {connect} from "@/dbconfig/dbconfig";

connect();


export async function POST(request: NextRequest){
    // console.log("Started")
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        // console.log(username,email,password)

        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // const newUser = new User({
        //     username,
        //     email,
        //     password: hashedPassword
        // })

        const savedUser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        // console.log("saved before",savedUser)

        // const savedUser = await newUser.save()

        // console.log(savedUser)

        
        const res = await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        console.log(res)



        return NextResponse.json({
            message: "User Registered successsfully!!",
            success: true,
            savedUser
        })

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred during sign up" }, { status: 500 });
    }
}