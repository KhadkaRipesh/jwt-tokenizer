import jwt from "jsonwebtoken";
type TokenType = "access" | "refresh";
export declare const verifyToken: (token: string, type?: TokenType) => string | jwt.JwtPayload;
export {};
