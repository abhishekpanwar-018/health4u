import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PatientDashboard from "./pages/patient/PatientDashboard";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import HealthInfoPage from "./pages/public/HealthInfoPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/health-info" element={<HealthInfoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute allowRoles={["PATIENT"]}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/provider/dashboard"
            element={
              <ProtectedRoute allowRoles={["PROVIDER"]}>
                <ProviderDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
