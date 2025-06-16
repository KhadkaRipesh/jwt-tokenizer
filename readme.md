# jwt-tokenizer

A lightweight and customizable JSON Web Token (JWT) toolkit built from scratch for educational use and real backend applications. It supports signing, verifying, and revoking both access and refresh tokens.

---

## ✨ Features

- 🔐 Sign and verify **access** and **refresh** tokens
- ⚙️ Customizable token expiration and secrets
- ❌ Simple in-memory **revocation** mechanism
- 🛠️ Tiny and dependency-light (uses `jsonwebtoken` under the hood)

---

## 📦 Installation

```bash
npm install jwt-tokenizer
```

## 🚀 Usage

### 1. Import the library and initialize it with your configuration (optional — defaults are provided):

```ts
import {
  initJwtTokenizer,
  signToken,
  verifyToken,
  revokeToken,
  isTokenRevoked,
} from "jwt-tokenizer";

// 1. Initialize configuration (optional)
initJwtTokenizer({
  accessSecret: "your-access-secret",
  refreshSecret: "your-refresh-secret",
  expiresIn: {
    access: "15m",
    refresh: "7d",
  },
});

// 2. Sign access and refresh tokens
const accessToken = signToken({ userId: 123 }, "access");
const refreshToken = signToken({ userId: 123 }, "refresh");

// 3. Verify tokens
try {
  const payload = verifyToken(accessToken, "access");
  console.log("Payload:", payload);
} catch (err) {
  console.error("Token verification failed:", err);
}

// 4. Revoke tokens
revokeToken(accessToken);

// 5. Check if token is revoked
const revoked = isTokenRevoked(accessToken);
console.log("Is token revoked?", revoked);
```

## API Reference

### `initJwtTokenizer(newConfig: Partial<TokenConfig>)`

Initialize or override JWT configuration.

- `newConfig.accessSecret` — Secret key for access tokens.
- `newConfig.refreshSecret` — Secret key for refresh tokens.
- `newConfig.expiresIn.access` — Access token expiry time (e.g. `'15m'`).
- `newConfig.expiresIn.refresh` — Refresh token expiry time (e.g. `'7d'`).

---

### `signToken(payload: object, type: "access" | "refresh" = "access"): string`

Sign a JWT token with the specified payload and type.

- `payload` — Data to encode in the token.
- `type` — Token type, either `"access"` or `"refresh"`. Defaults to `"access"`.

Returns a signed JWT string.

---

### `verifyToken(token: string, type: "access" | "refresh" = "access"): object | string`

Verify and decode a JWT token.

- `token` — The JWT string to verify.
- `type` — Token type. Defaults to `"access"`.

Returns the decoded payload if valid; otherwise throws an error.

---

### `revokeToken(token: string): void`

Revoke a token by adding it to an in-memory blacklist.

---

### `isTokenRevoked(token: string): boolean`

Check if a token is revoked.

---

## Important Notes

- The token revocation feature stores revoked tokens **in memory** and **will not persist** after server restarts. For production, integrate with a persistent store like a database or Redis.
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
Portfolio: [https://ripeshkhadka.com.np](https://ripeshkhadka.com.np)
