"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenRevoked = exports.revokeToken = void 0;
const revokedTokens = new Set();
const revokeToken = (token) => {
    revokedTokens.add(token);
};
exports.revokeToken = revokeToken;
const isTokenRevoked = (token) => {
    return revokedTokens.has(token);
};
exports.isTokenRevoked = isTokenRevoked;
