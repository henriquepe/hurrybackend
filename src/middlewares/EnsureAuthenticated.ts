import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import jwt from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

// eslint-disable-next-line consistent-return
export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void | Response<any> {
    // [] validação do token

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('JWT token is missing');
    }

    const [, token] = authHeader.split(' ');

    const { secret } = jwt.jwt;

    try {
        const decodedToken = verify(token, secret);

        if (!decodedToken) {
            throw new Error('Invalid JWT Token ');
        }

        const { sub } = decodedToken as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch (err) {
        return response.status(401).json({ error: err.message });
    }
}
