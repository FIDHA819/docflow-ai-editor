"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importDocumentFile = exports.shareDocument = exports.updateDocument = exports.getDocument = exports.getDocuments = exports.createDocument = void 0;
const api_1 = __importDefault(require("./api"));
const createDocument = async () => {
    const response = await api_1.default.post("/documents");
    return response.data;
};
exports.createDocument = createDocument;
const getDocuments = async () => {
    const response = await api_1.default.get("/documents");
    return response.data;
};
exports.getDocuments = getDocuments;
const getDocument = async (id) => {
    const response = await api_1.default.get(`/documents/${id}`);
    return response.data;
};
exports.getDocument = getDocument;
const updateDocument = async (id, data) => {
    const response = await api_1.default.put(`/documents/${id}`, data);
    return response.data;
};
exports.updateDocument = updateDocument;
const shareDocument = async (id, email) => {
    const response = await api_1.default.post(`/documents/${id}/share`, { email });
    return response.data;
};
exports.shareDocument = shareDocument;
const importDocumentFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api_1.default.post("/documents/import", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
exports.importDocumentFile = importDocumentFile;
