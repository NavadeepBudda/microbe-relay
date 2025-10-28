import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./lib/test-pretest.ts"; // Import test functions

createRoot(document.getElementById("root")!).render(<App />);
