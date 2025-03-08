import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";

connect();

export async function GET(request: NextRequest){
    try {
        const userID = await getDataFromToken(request);

        const user = await User.findOne({_id: userID}).select("-password");

        return NextResponse.json({
            message: "User Found!!",
            data: user,
            success: true
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred on me route" }, { status: 500 });
    }
}