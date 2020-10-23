"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
function ensureAuthenticated(request, response, next) {
    // [] validação do token
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error('JWT token is missing');
    }
    const [, token] = authHeader.split(' ');
    try {
        const { secret } = auth_1.default.jwt;
        const decodedToken = jsonwebtoken_1.verify(token, secret);
        const { sub } = decodedToken;
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (err) {
        throw new Error('Invalid JWT Token ');
    }
}
exports.default = ensureAuthenticated;
