import { EditorContent, useEditor } from "@tiptap/react";
import type { JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";
import Toolbar from "./Toolbar";

interface Props {
  content: JSONContent | null;
  onChange: (content: JSONContent) => void;
}

export default function Editor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content || {
      type: "doc",
      content: [{ type: "paragraph" }],
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none min-h-[420px] focus:outline-none px-6 py-5",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
  });

  useEffect(() => {
    if (editor && content) {
      const current = editor.getJSON();
      if (JSON.stringify(current) !== JSON.stringify(content)) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
}