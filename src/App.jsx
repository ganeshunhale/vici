import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import Dashboard from "@/pages/Dashboard";
import Selective from "./pages/Selective";
import LeadsUploadPage from "./pages/LeadsUploadPage";
import { Toaster } from "react-hot-toast";
import { Layout } from "./Layout";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import CallPage from "./pages/CallPage";
import SessionPopup from "./components/SessionPopup";
function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold text-white">404 - Page Not Found</h1>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
        <SessionPopup />
          <Routes>
          <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/selective" element={<Selective />} />
            <Route path="/leads-upload" element={<PrivateRoute><LeadsUploadPage /></PrivateRoute>} />
            <Route path="/call" element={<PrivateRoute><CallPage /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
