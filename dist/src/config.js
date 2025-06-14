"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initJwtTokenizer = exports.jwtConfig = void 0;
// initial values (default config)
exports.jwtConfig = {
    accesSecret: "default-access-secret",
    refreshSecret: "default-refresh-secret",
    expiresIn: {
        access: "15m",
        refresh: "7d",
    },
};
// funtion to override config
const initJwtTokenizer = (newConfig) => {
    exports.jwtConfig = {
        ...exports.jwtConfig,
        ...newConfig,
        expiresIn: {
            ...exports.jwtConfig.expiresIn,
            ...newConfig.expiresIn,
        },
    };
};
exports.initJwtTokenizer = initJwtTokenizer;
