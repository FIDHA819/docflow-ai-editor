"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const api_1 = __importDefault(require("./api"));
const loginUser = async (email, password) => {
    const response = await api_1.default.post("/auth/login", {
        email,
        password,
    });
    return response.data;
};
exports.loginUser = loginUser;
