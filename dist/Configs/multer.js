"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatarUserConfig = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const joi_1 = __importDefault(require("joi"));
const user_1 = __importDefault(require("../Validation/user"));
const validate = new user_1.default();
exports.avatarUserConfig = {
    dest: path_1.default.resolve(__dirname, '..', '..', 'uploads'),
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path_1.default.resolve(__dirname, '..', '..', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto_1.default.randomBytes(16, (err, hash) => {
                if (err) {
                    cb(err, 'erro');
                }
                const fileName = `${hash.toString('hex')}${file.originalname}`;
                cb(null, fileName);
            });
        }
    }),
    fileFilter: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        console.log(body);
        const schema = joi_1.default.object({
            email: joi_1.default
                .string()
                .email()
                .required(),
            username: joi_1.default
                .string()
                .required(),
            name: joi_1.default
                .string()
                .required(),
            password: joi_1.default
                .string()
                .required(),
            accentColor: joi_1.default
                .string()
                .required(),
        });
        const { error: errSechemJoi } = schema.validate(body);
        if (errSechemJoi)
            cb(new Error(errSechemJoi.message));
        const errValidate = yield validate.register(body.email);
        if (errValidate)
            cb(new Error(errValidate.msg));
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type.'));
        }
    }),
    limits: {
        fileSize: 2 * 2024 * 1024
    }
};
