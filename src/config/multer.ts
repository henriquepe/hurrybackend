/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

const storageTypes = {
    local: multer.diskStorage({
        destination: (request, file, callback) => {
            callback(
                null,
                path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
            );
        },
        filename: (request, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) callback(err, '');

                request.file.key = `${hash.toString('hex')}${
                    file.originalname
                }`;

                callback(null, request.file.key);
            });
        },
    }),

    s3: multerS3({
        s3: new AWS.S3(),
        bucket: 'hurryawsbucket',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (request, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) callback(err, '');

                const fileName = `${hash.toString('hex')}${file.originalname}`;

                callback(null, fileName);
            });
        },
    }),
};

export default {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // eslint-disable-next-line dot-notation
    storage: storageTypes['s3'],
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    fileFilter: (request: any, file: any, callback: any): any => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/jpg',
        ];

        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Invalid file type'));
        }
    },
};
