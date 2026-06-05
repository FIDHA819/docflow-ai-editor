"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginPage;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const authService_1 = require("../services/authService");
const lucide_react_1 = require("lucide-react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
function LoginPage() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [showPw, setShowPw] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            react_hot_toast_1.default.error("Please fill in all fields");
            return;
        }
        try {
            setLoading(true);
            const data = await (0, authService_1.loginUser)(email, password);
            localStorage.setItem("token", data.token);
            react_hot_toast_1.default.success("Signed in successfully");
            navigate("/dashboard");
        }
        catch (err) {
            const message = err?.response?.data
                ?.message || "Invalid credentials";
            react_hot_toast_1.default.error(message);
        }
        finally {
            setLoading(false);
        }
    };
    const fillDemo = (demoEmail) => {
        setEmail(demoEmail);
        setPassword("password123");
    };
    return (<div className="min-h-screen bg-slate-950 lg:grid lg:grid-cols-2">
      <section className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_28%)]"/>

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-lg font-bold text-white">
            D
          </div>
          <span className="text-2xl font-semibold text-white">DocFlow</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
            Collaborative writing workspace
          </p>
          <h1 className="text-5xl font-semibold leading-tight text-white">
            Write, edit, share, and move work forward.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-slate-300">
            A lightweight document editor built for practical collaboration,
            fast iteration, and clean document workflows.
          </p>
        </div>

        <div className="relative z-10 flex gap-6 text-sm text-slate-400">
          <span>Rich text editing</span>
          <span>File import</span>
          <span>Sharing</span>
        </div>
      </section>

      <section className="flex items-center justify-center bg-slate-50 px-6 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
                D
              </div>
              <span className="text-xl font-semibold text-slate-900">
                DocFlow
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Sign in to your workspace
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"/>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"/>
                  <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600">
                    {showPw ? <lucide_react_1.EyeOff size={16}/> : <lucide_react_1.Eye size={16}/>}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Signing in..." : <>Sign in <lucide_react_1.ArrowRight size={16}/></>}
              </button>
            </form>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Demo accounts
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
            { name: "Alice", email: "alice@example.com" },
            { name: "Bob", email: "bob@example.com" },
        ].map((user) => (<button key={user.email} type="button" onClick={() => fillDemo(user.email)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-left transition hover:border-slate-300 hover:bg-white">
                    <p className="text-sm font-medium text-slate-900">
                      {user.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </button>))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>);
}
