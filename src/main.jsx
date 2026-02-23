import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { VicidialPopupProvider } from "./context/VicidialPopupContext";

createRoot(document.getElementById("root")).render(<VicidialPopupProvider><App /></VicidialPopupProvider>);
