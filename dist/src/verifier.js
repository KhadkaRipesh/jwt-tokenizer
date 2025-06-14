"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const verifyToken = (token, type = "access") => {
    const secret = type === "access" ? config_1.jwtConfig.accesSecret : config_1.jwtConfig.refreshSecret;
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
