import Redis from "ioredis";

export type RedisConfig = {
  host: string;
  port: number;
  password?: string;
};

class RedisClient {
  private static instance: RedisClient;
  private client?: Redis;

  private constructor() {}

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  public init(config: RedisConfig) {
    if (this.client) return;
    this.client = new Redis({
      host: config.host,
      port: config.port,
      password: config.password,
    });
  }

  public getClient(): Redis {
    if (!this.client) {
      throw new Error("Redis client not initialized. Call `init()` first.");
    }
    return this.client;
  }

  public async quit(): Promise<void> {
    if (this.client) {
      await this.client.quit();
      this.client = undefined;
    }
  }
}

export default RedisClient;
