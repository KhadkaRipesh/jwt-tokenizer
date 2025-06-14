"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("./src");
(0, src_1.initJwtTokenizer)({
    accesSecret: "test-secret",
    expiresIn: { access: "30m" },
});
const token = (0, src_1.signToken)({ userId: 3 });
console.log("Token", token);
const payload = (0, src_1.verifyToken)(token);
console.log(payload);
