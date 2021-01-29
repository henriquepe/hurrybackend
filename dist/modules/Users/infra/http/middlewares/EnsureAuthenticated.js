"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../../../../../config/auth"));
// eslint-disable-next-line consistent-return
function ensureAuthenticated(request, response, next) {
    // [] validação do token
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error('JWT token is missing');
    }
    const [, token] = authHeader.split(' ');
    const { secret } = auth_1.default.jwt;
    try {
        const decodedToken = jsonwebtoken_1.verify(token, secret);
        if (!decodedToken) {
            throw new Error('Invalid JWT Token ');
        }
        const { sub } = decodedToken;
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (err) {
        return response.status(401).json({ error: err.message });
    }
}
exports.default = ensureAuthenticated;
//# sourceMappingURL=EnsureAuthenticated.js.map