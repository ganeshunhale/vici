import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import { Layout } from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import DashboardLoader from "./services/DashboardLoader";

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
        <DashboardLoader />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
