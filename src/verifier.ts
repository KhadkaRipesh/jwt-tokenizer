import jwt from "jsonwebtoken";
import { jwtConfig } from "./config";

type TokenType = "access" | "refresh";

export const verifyToken = (token: string, type: TokenType = "access") => {
  const secret =
    type === "access" ? jwtConfig.accesSecret : jwtConfig.refreshSecret;

  return jwt.verify(token, secret);
};
