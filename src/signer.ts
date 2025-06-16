import jwt from "jsonwebtoken";
import { jwtConfig } from "./config";

type TokenType = "access" | "refresh";

export const signToken = (
  payload: object,
  type: TokenType = "access"
): string => {
  const secret =
    type === "access" ? jwtConfig.accessSecret : jwtConfig.refreshSecret;
  const expiresIn = jwtConfig.expiresIn[type];

  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
};
