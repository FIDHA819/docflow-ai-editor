"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocumentCard;
const lucide_react_1 = require("lucide-react");
const react_router_dom_1 = require("react-router-dom");
function DocumentCard({ document, shared = false, }) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<button type="button" onClick={() => navigate(`/documents/${document._id}`)} className="group w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <lucide_react_1.FileText size={20}/>
        </div>

        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${shared
            ? "bg-blue-50 text-blue-700"
            : "bg-emerald-50 text-emerald-700"}`}>
          {shared ? <lucide_react_1.Share2 size={12}/> : null}
          {shared ? "Shared" : "Owned"}
        </span>
      </div>

      <h3 className="mt-4 line-clamp-1 text-lg font-semibold text-slate-900 group-hover:text-black">
        {document.title || "Untitled document"}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-slate-500">
        {shared
            ? "A document shared with you."
            : "Your document, ready to edit and share."}
      </p>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
        <lucide_react_1.Clock size={14}/>
        <span>
          Updated {new Date(document.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </button>);
}
