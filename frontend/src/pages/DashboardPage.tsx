import { useEffect, useRef, useState } from "react";
import {
  createDocument,
  getDocuments,
  importDocumentFile,
} from "../services/documentService";
import DocumentCard from "../components/DocumentCard";
import { useNavigate } from "react-router-dom";
import { Plus, Upload, LogOut, FileText } from "lucide-react";
import toast from "react-hot-toast";
import type { DocumentItem } from "../types/document";

export default function DashboardPage() {
  const [owned, setOwned] = useState<DocumentItem[]>([]);
  const [shared, setShared] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const data = await getDocuments();
      setOwned(data.owned || []);
      setShared(data.shared || []);
    } catch {
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleCreate = async () => {
    try {
      setCreating(true);
      const doc = await createDocument();
      navigate(`/documents/${doc._id}`);
    } catch {
      toast.error("Could not create document");
    } finally {
      setCreating(false);
    }
  };

  const handleImport = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = [".txt", ".md"];
    const isValid = validTypes.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );

    if (!isValid) {
      toast.error("Only .txt and .md files are supported");
      return;
    }

    try {
      setUploading(true);
      const doc = await importDocumentFile(file);
      toast.success("File imported successfully");
      navigate(`/documents/${doc._id}`);
    } catch {
      toast.error("Import failed. Check backend support.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">DocFlow</h1>
            <p className="text-sm text-slate-500">
              Lightweight collaborative documents
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md"
              onChange={handleImport}
              className="hidden"
            />

         

            <button
              type="button"
              onClick={handleCreate}
              disabled={creating}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              <Plus size={16} />
              {creating ? "Creating..." : "New document"}
            </button>

            <button
              type="button"
              onClick={logout}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              My documents
            </h2>
            <span className="text-sm text-slate-500">{owned.length} total</span>
          </div>

          {loading ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-white"
                />
              ))}
            </div>
          ) : owned.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <FileText size={24} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No documents yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Create a new document or import a .txt or .md file to get
                started.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {owned.map((doc) => (
                <DocumentCard key={doc._id} document={doc} />
              ))}
            </div>
          )}
        </section>

        <section className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Shared with me
            </h2>
            <span className="text-sm text-slate-500">
              {shared.length} available
            </span>
          </div>

          {shared.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-sm text-slate-500">
              Shared documents will appear here.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {shared.map((doc) => (
                <DocumentCard key={doc._id} document={doc} shared />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}