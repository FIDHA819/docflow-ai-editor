import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import {
  getDocument,
  updateDocument,
  shareDocument,
} from "../services/documentService";
import type { JSONContent } from "@tiptap/react";
import { ArrowLeft, CheckCircle2, Loader2, Share2 } from "lucide-react";
import toast from "react-hot-toast";

type SaveState = "idle" | "saving" | "saved" | "error";

export default function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [sharing, setSharing] = useState(false);

  const isReady = useMemo(() => !!id, [id]);

  useEffect(() => {
    if (!isReady) return;

    const loadDocument = async () => {
      try {
        setLoading(true);
        const data = await getDocument(id!);
        setTitle(data.title || "Untitled document");
      setContent(data.content as JSONContent);
      } catch {
        toast.error("Failed to load document");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [id, isReady, navigate]);

  useEffect(() => {
    if (!id || !content || loading) return;

    setSaveState("saving");

    const timeout = setTimeout(async () => {
      try {
       await updateDocument(id, {
  title,
  content: content as any,
});
        setSaveState("saved");

        setTimeout(() => {
          setSaveState((prev) => (prev === "saved" ? "idle" : prev));
        }, 1500);
      } catch {
        setSaveState("error");
      }
    }, 900);

    return () => clearTimeout(timeout);
  }, [id, title, content, loading]);

  const handleShare = async () => {
    if (!email.trim()) {
      toast.error("Enter an email address");
      return;
    }

    try {
      setSharing(true);
      await shareDocument(id!, email.trim());
      toast.success("Document shared successfully");
      setEmail("");
    } catch {
      toast.error("Failed to share document");
    } finally {
      setSharing(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-7xl animate-pulse space-y-6">
          <div className="h-14 rounded-2xl bg-white" />
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="h-[600px] rounded-3xl bg-white lg:col-span-3" />
            <div className="h-64 rounded-3xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeft size={18} />
            </button>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full min-w-[220px] max-w-2xl rounded-xl border border-transparent bg-transparent px-3 py-2 text-2xl font-semibold text-slate-900 outline-none transition focus:border-slate-200 focus:bg-slate-50"
              placeholder="Untitled document"
            />
          </div>

          <div className="text-sm text-slate-500">
            {saveState === "saving" && (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                Saving...
              </span>
            )}
            {saveState === "saved" && (
              <span className="inline-flex items-center gap-2 text-emerald-600">
                <CheckCircle2 size={14} />
                Saved
              </span>
            )}
            {saveState === "error" && (
              <span className="text-rose-600">Save failed</span>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-4 lg:px-8">
        <section className="lg:col-span-3">
          <Editor content={content} onChange={setContent} />
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Share2 size={18} className="text-slate-700" />
              <h3 className="text-lg font-semibold text-slate-900">
                Share document
              </h3>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Grant another user access by email.
            </p>

            <div className="mt-4 space-y-3">
              <input
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />

              <button
                type="button"
                onClick={handleShare}
                disabled={sharing}
                className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
              >
                {sharing ? "Sharing..." : "Share"}
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Supported formatting
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Bold, italic, underline</li>
              <li>Headings</li>
              <li>Bulleted and numbered lists</li>
              <li>Autosave with persisted content</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}