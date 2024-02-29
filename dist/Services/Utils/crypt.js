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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class crypto {
    constructor() {
        this.encrypt = (encrypt) => __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            encrypt = yield bcryptjs_1.default.hash(encrypt, salt);
            return encrypt;
        });
        this.encrypt_validate = (encrypt, liken_ecrypt) => __awaiter(this, void 0, void 0, function* () {
            return !(yield bcryptjs_1.default.compare(encrypt, liken_ecrypt));
        });
    }
}
exports.default = crypto;
