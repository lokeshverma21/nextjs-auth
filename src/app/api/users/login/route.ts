import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { error } from "console";
import jwt from "jsonwebtoken";

connect();


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();

        const {email, password} = reqBody;

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({error: "User does not exists!"}, {status: 404})
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({error: "Invalid Password"}, {status: 400})
        }


        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"})

        const response = NextResponse.json({
            message: "Login Successfull!!",
            success: true
        })

        response.cookies.set("token", token,{
            httpOnly: true
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}