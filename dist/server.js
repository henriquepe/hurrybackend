"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
require("./database");
require("reflect-metadata");
var app = express_1.default();
app.use(express_1.default.json());
app.use(index_1.default);
var port = process.env.PORT || 3000;
dotenv_1.default.config();
app.listen(port, function () {
    console.log("this server started on port " + port);
});
