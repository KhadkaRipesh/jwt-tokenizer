export type TokenConfig = {
  accessSecret: string;
  refreshSecret: string;
  expiresIn: {
    access: string;
    refresh?: string;
  };
};

// initial values (default config)
export let jwtConfig: TokenConfig = {
  accessSecret: "default-access-secret",
  refreshSecret: "default-refresh-secret",
  expiresIn: {
    access: "15m",
    refresh: "7d",
  },
};

// funtion to override config
export const initJwtTokenizer = (newConfig: Partial<TokenConfig>) => {
  jwtConfig = {
    ...jwtConfig,
    ...newConfig,
    expiresIn: {
      ...jwtConfig.expiresIn,
      ...newConfig.expiresIn,
    },
  };
};
