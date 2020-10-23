"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
require("reflect-metadata");
require("./database");
const app = express_1.default();
app.use(express_1.default.json());
app.use(index_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`this server started on port ${port}`);
});
