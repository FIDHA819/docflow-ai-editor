"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const LoginPage_1 = __importDefault(require("./pages/LoginPage"));
const DashboardPage_1 = __importDefault(require("./pages/DashboardPage"));
const EditorPage_1 = __importDefault(require("./pages/EditorPage"));
function ProtectedRoute({ children, }) {
    const token = localStorage.getItem("token");
    return token ? children : <react_router_dom_1.Navigate to="/login" replace/>;
}
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/login" element={<LoginPage_1.default />}/>

        <react_router_dom_1.Route path="/dashboard" element={<ProtectedRoute>
              <DashboardPage_1.default />
            </ProtectedRoute>}/>

        <react_router_dom_1.Route path="/documents/:id" element={<ProtectedRoute>
              <EditorPage_1.default />
            </ProtectedRoute>}/>

        <react_router_dom_1.Route path="/" element={<react_router_dom_1.Navigate to="/dashboard" replace/>}/>
        <react_router_dom_1.Route path="*" element={<react_router_dom_1.Navigate to="/dashboard" replace/>}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
