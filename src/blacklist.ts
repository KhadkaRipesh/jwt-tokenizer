const revokedTokens = new Set<string>();

export const revokeToken = (token: string) => {
  revokedTokens.add(token);
};

export const isTokenRevoked = (token: string) => {
  return revokedTokens.has(token);
};
