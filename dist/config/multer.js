"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const storageTypes = {
    local: multer_1.default.diskStorage({
        destination: (request, file, callback) => {
            callback(null, path_1.default.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        filename: (request, file, callback) => {
            crypto_1.default.randomBytes(16, (err, hash) => {
                if (err)
                    callback(err, '');
                request.file.key = `${hash.toString('hex')}${file.originalname}`;
                callback(null, request.file.key);
            });
        },
    }),
    s3: multer_s3_1.default({
        s3: new aws_sdk_1.default.S3(),
        bucket: 'hurryawsbucket',
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (request, file, callback) => {
            crypto_1.default.randomBytes(16, (err, hash) => {
                if (err)
                    callback(err, '');
                const fileName = `${hash.toString('hex')}${file.originalname}`;
                callback(null, fileName);
            });
        },
    }),
};
exports.default = {
    dest: path_1.default.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // eslint-disable-next-line dot-notation
    storage: storageTypes['s3'],
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    fileFilter: (request, file, callback) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/jpg',
        ];
        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        }
        else {
            callback(new Error('Invalid file type'));
        }
    },
};
