import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import Theme from "./components/Theme/Theme";
import { ThemeProvider } from "@mui/material";

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
