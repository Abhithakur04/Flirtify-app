import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"

document.documentElement.setAttribute("data-theme", "light");
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)
