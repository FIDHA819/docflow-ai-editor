import api from "./api";
import type { JSONContent } from "@tiptap/core";


import type { DocumentItem, TiptapContent } from "../types/document";

export const createDocument = async (): Promise<DocumentItem> => {
  const response = await api.post("/documents");
  return response.data;
};

export const getDocuments = async (): Promise<{
  owned: DocumentItem[];
  shared: DocumentItem[];
}> => {
  const response = await api.get("/documents");
  return response.data;
};

export const getDocument = async (id: string): Promise<DocumentItem> => {
  const response = await api.get(`/documents/${id}`);
  return response.data;
};

export const updateDocument = async (
  id: string,
 data: {
  title: string;
  content: JSONContent | null;
}
): Promise<DocumentItem> => {
  const response = await api.put(`/documents/${id}`, data);
  return response.data;
};

export const shareDocument = async (
  id: string,
  email: string
): Promise<{ message: string }> => {
  const response = await api.post(`/documents/${id}/share`, { email });
  return response.data;
};

export const importDocumentFile = async (
  file: File
): Promise<DocumentItem> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/documents/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};