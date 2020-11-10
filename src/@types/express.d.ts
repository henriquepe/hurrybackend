declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
        file: {
            key: string;
            originalname: string;
            size: number;
            url: string;
            filename: string;
            location: string;
        };
    }
}
