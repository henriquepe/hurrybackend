import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import jwt from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // [] validação do token

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('JWT token is missing');
    }

    const [, token] = authHeader.split(' ');

    try {
        const { secret } = jwt.jwt;

        const decodedToken = verify(token, secret);

        const { sub } = decodedToken as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch (err) {
        throw new Error('Invalid JWT Token ');
    }
}
