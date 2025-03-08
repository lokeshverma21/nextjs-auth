import { NextRequest } from "next/server";
import jwt  from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const encodedToken = request.cookies.get("token")?.value || '';

        const decodedToken = jwt.verify(encodedToken, process.env.TOKEN_SECRET!) as {id : string}

        return decodedToken.id;
        
    } catch (error:unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        // throw new Error(error.message)
    }
}