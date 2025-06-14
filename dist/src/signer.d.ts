type TokenType = "access" | "refresh";
export declare const signToken: (payload: object, type?: TokenType) => string;
export {};
