export type TokenConfig = {
    accesSecret: string;
    refreshSecret: string;
    expiresIn: {
        access: string;
        refresh?: string;
    };
};
export declare let jwtConfig: TokenConfig;
export declare const initJwtTokenizer: (newConfig: Partial<TokenConfig>) => void;
