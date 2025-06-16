# jwt-tokenizer

A lightweight, class-based JWT utility with Redis support for token revocation.
Built for Node.js environments to make token handling plug-and-play — with sensible defaults, full override flexibility, and optional revocation using Redis.

    v2.0.0 is a complete upgrade from the function-based version, now powered by Singleton classes for better control and initialization safety.

---

## ✨ Features

- ✅ Simple JWT signing and verification
- 🔄 Built-in refresh/access token support
- 🔐 Optional token revocation using Redis
- 🧱 Singleton-based, clean initialization
- ⚙️ Easily extendable with custom options

---

## 📦 Installation

```bash
npm install jwt-tokenizer
# or
yarn add jwt-tokenizer
```

## 🚀 Usage

### 1. Initialize the tokenizer and redis:

```ts
import { JwtTokenizer, RedisClient } from "jwt-tokenizer";

const jwt = JwtTokenizer.getInstance();
const redis = RedisClient.getInstance();

jwt.init({
  accessSecret: "your-access-secret",
  refreshSecret: "your-refresh-secret",
  expiresIn: {
    access: "10m",
    refresh: "3d",
  },
});

redis.init({
  host: "redis-host",
  port: 6379,
});
```

### 2. Sign a token:

```ts
const token = jwt.sign({ userId: 123 });
console.log("Signed Token:", token);
```

### 3. Verify a token:

```ts
const payload = jwt.verify(token);
console.log("Payload:", payload);
```

## 🔁 Token Revocation (Optional)

### Revoke a Token

```ts
await jwt.revoke(token); // Stores it in Redis with TTL
```

### Check if a token is revoked

```ts
const isRevoked = await jwt.isRevoked(token);
console.log("Revoked?", isRevoked);
```

## API Reference (v2.0.0)

### `JwtTokenizer.getInstance().init(config: TokenConfig)`

Initialize the JWT tokenizer with your config.

- `accessSecret` — Secret key for access tokens.
- `refreshSecret` — Secret key for refresh tokens.
- `expiresIn.access` — Access token expiry time (e.g. `'15m'`).
- `expiresIn.refresh` — Refresh token expiry time (e.g. `'7d'`).
- `signOptions?` — Optional global jsonwebtoken sign options.
- `verifyOptions?` — Optional global jsonwebtoken verify options.

---

### `JwtTokenizer.getInstance().sign(payload: object, type: "access" | "refresh" = "access", options?: SignOptions): string`

Generates and returns a signed JWT token.

- `payload` — Data to encode in the token.
- `type` — Token type, either `"access"` or `"refresh"`. Defaults to `"access"`.
- `options?` — Optional override of default sign options.

Returns a signed JWT string.

---

### `JwtTokenizer.getInstance().verify(token: string, type: "access" | "refresh" = "access", options?: VerifyOptions): JwtPayload | string`

Verify and decode a JWT token.

- `token` — The JWT string to verify.
- `type` — Token type. Defaults to `"access"`.
- `options?` — Optional override of default verify options.

Returns the decoded payload if valid; otherwise throws an error.

---

### `JwtTokenizer.getInstance().revoke(token: string): Promise<void>`

Revoke a token by adding it to an in-memory blacklist.

- `token` — JWT string to revoke.

---

### `JwtTokenizer.getInstance().isRevoked(token: string): Promise<boolean>`

Check if a token is revoked.

- `token` — JWT string to check.

---

### `RedisClient.getInstance().init(config: RedisConfig)`

Initialize the Redis client used for revocation.

- `host` — Redis host.
- `port` — Redis port.
- `password` — Optional Redis password.

---

### `RedisClient.getInstance().getClient(): Redis`

Returns the initialized ioredis client instance.

---

### `RedisClient.getInstance().quit(): Promise<void>`

Gracefully closes the Redis connection.

---

## Important Notes

- The token revocation feature requires Redis to be initialized. If Redis is not initialized, token signing and verification will still work normally, but revocation and revocation checks will be disabled.
- Make sure to initialize Redis properly before using token revocation features to avoid runtime errors or unexpected behavior.
- Keep your secret keys secure, random, and long enough to ensure safety.
- Always handle exceptions when verifying tokens to avoid crashes.
- This library is intended for backend use in Node.js environments.

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the package.

---

## License

ISC © Ripesh Khadka

---

## Author

Ripesh Khadka
[https://ripeshkhadka.com.np](https://ripeshkhadka.com.np)
