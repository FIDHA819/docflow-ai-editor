"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Editor;
const react_1 = require("@tiptap/react");
const starter_kit_1 = __importDefault(require("@tiptap/starter-kit"));
const extension_underline_1 = __importDefault(require("@tiptap/extension-underline"));
const react_2 = require("react");
const Toolbar_1 = __importDefault(require("./Toolbar"));
function Editor({ content, onChange }) {
    const editor = (0, react_1.useEditor)({
        extensions: [starter_kit_1.default, extension_underline_1.default],
        content: content || {
            type: "doc",
            content: [{ type: "paragraph" }],
        },
        editorProps: {
            attributes: {
                class: "prose prose-slate max-w-none min-h-[420px] focus:outline-none px-6 py-5",
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getJSON());
        },
    });
    (0, react_2.useEffect)(() => {
        if (editor && content) {
            const current = editor.getJSON();
            if (JSON.stringify(current) !== JSON.stringify(content)) {
                editor.commands.setContent(content);
            }
        }
    }, [content, editor]);
    return (<div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <Toolbar_1.default editor={editor}/>
      <react_1.EditorContent editor={editor} className="bg-white"/>
    </div>);
}
