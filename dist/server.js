"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use((0, cors_1.default)());
app.use(routes_1.default);
//images
app.use("/image", express_1.default.static(path_1.default.resolve(__dirname, "..", "uploads")));
const port = 2525;
app.listen(port, () => {
    console.log(port);
    console.log("oi 😎");
});
