// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AdminEditPage from "./pages/AdminEditPage/AdminEditPage";
import AssignmentViewPage from "./pages/AssignmentViewPage/AssignmentViewPage";
import TmPerformanceViewPage from "./pages/TmPerformancePage/TmPerformanceViewPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditPage"
          element={
            <PrivateRoute>
              <AdminEditPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/AssignmentViewPage"
          element={
            <PrivateRoute>
              <AssignmentViewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/TmPerformanceViewPage"
          element={
            <PrivateRoute>
              <TmPerformanceViewPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
