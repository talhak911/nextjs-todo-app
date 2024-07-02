import { NextRequest } from "next/server";
import { jwtVerify } from 'jose';

export const getDataFromToken = async (request: NextRequest): Promise<string> => {
    try {
        const token = request.cookies.get("token")?.value || '';
        if (!token) {
            throw new Error("Token not found");
        }

        const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
        const { payload } = await jwtVerify(token, secret);

        return payload.id as string;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
