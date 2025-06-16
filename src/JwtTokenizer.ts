import jwt, { JwtPayload, SignOptions, VerifyOptions } from "jsonwebtoken";
import { RedisClient } from "./index";
export type TokenConfig = {
  accessSecret: string;
  refreshSecret: string;
  expiresIn: {
    access: string;
    refresh?: string;
  };
  signOptions?: Omit<SignOptions, "expiresIn">;
  verifyOptions?: VerifyOptions;
};

type TokenType = "access" | "refresh";

class JwtTokenizer {
  private static instance: JwtTokenizer;
  private config?: TokenConfig;
  private signOptions?: Omit<SignOptions, "expiresIn">;
  private verifyOptions?: VerifyOptions;

  private constructor() {}

  public static getInstance(): JwtTokenizer {
    if (!JwtTokenizer.instance) {
      JwtTokenizer.instance = new JwtTokenizer();
    }
    return JwtTokenizer.instance;
  }

  public init(config: TokenConfig) {
    this.config = config;
    this.signOptions = config.signOptions;
    this.verifyOptions = config.verifyOptions;
  }

  private assertInitialized() {
    if (!this.config) {
      throw new Error("JwtTokenizer is not initialized. Call `init()` first.");
    }
  }

  public sign(
    payload: object,
    type: TokenType = "access",
    options?: SignOptions
  ): string {
    this.assertInitialized();
    const secret =
      type === "access"
        ? this.config!.accessSecret
        : this.config!.refreshSecret;
    const expiresIn = this.config!.expiresIn[type];

    return jwt.sign(payload, secret, {
      ...this.signOptions,
      ...options,
      expiresIn,
    } as SignOptions);
  }

  public verify(
    token: string,
    type: TokenType = "access",
    options?: VerifyOptions
  ): JwtPayload | string {
    this.assertInitialized();
    const secret =
      type === "access"
        ? this.config!.accessSecret
        : this.config!.refreshSecret;

    return jwt.verify(token, secret, {
      ...this.verifyOptions,
      ...options,
    });
  }

  public getConfig(): TokenConfig {
    this.assertInitialized();
    return this.config!;
  }

  public async revoke(token: string): Promise<void> {
    const redis = RedisClient.getInstance().getClient();

    const decoded = jwt.decode(token) as JwtPayload | null;
    if (!decoded || !decoded.exp) {
      throw new Error("Invalid JWT: Cannot decode expiration.");
    }

    const now = Math.floor(Date.now() / 1000);
    const ttl = decoded.exp - now;

    if (ttl <= 0) return;

    await redis.set(`revoked:${token}`, "1", "EX", ttl);
  }

  public async isRevoked(token: string): Promise<boolean> {
    const redis = RedisClient.getInstance().getClient();
    const result = await redis.get(`revoked:${token}`);
    return result === "1";
  }
}

export default JwtTokenizer;
