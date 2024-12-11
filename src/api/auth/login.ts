// Login API.

import {NextApiRequest, NextApiResponse} from "next";
import {loginAPI, LoginRequest} from "@/service/authService";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const loginData: LoginRequest = req.body;
            const response = await loginAPI(loginData);
            res.status(200).json(response);
        } catch {
            res.status(400).json({message: "Login failed"});
        }
    } else {
        res.status(405).json({message: "Method not allowed"});
    }
}
