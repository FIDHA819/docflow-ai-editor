"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Toolbar;
const lucide_react_1 = require("lucide-react");
function ToolbarButton({ onClick, active, title, children, }) {
    return (<button type="button" onClick={onClick} title={title} className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-medium transition ${active
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>
      {children}
    </button>);
}
function Toolbar({ editor }) {
    if (!editor)
        return null;
    return (<div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50/80 p-3">
      <ToolbarButton title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <lucide_react_1.Bold size={16}/>
      </ToolbarButton>

      <ToolbarButton title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <lucide_react_1.Italic size={16}/>
      </ToolbarButton>

      <ToolbarButton title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <lucide_react_1.Underline size={16}/>
      </ToolbarButton>

      <ToolbarButton title="Heading 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <lucide_react_1.Heading1 size={16}/>
      </ToolbarButton>

      <ToolbarButton title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <lucide_react_1.Heading2 size={16}/>
      </ToolbarButton>

      <ToolbarButton title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <lucide_react_1.List size={16}/>
      </ToolbarButton>

      <ToolbarButton title="Ordered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <lucide_react_1.ListOrdered size={16}/>
      </ToolbarButton>
    </div>);
}
