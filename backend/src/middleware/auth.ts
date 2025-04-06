import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";

type headerType = string | undefined;

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const header: headerType = req.headers.authorization;
    const JWT_SECRET: string = process.env.JWT_SECRET || "ChatAppAtul";

    if (!header || !header.startsWith("Bearer ")) {
        console.log("header",header);
        res.status(401).json({ message: "Authorization token is missing or invalid" });
        return;
    }

    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (e) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};