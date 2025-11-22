import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="page page-centered">
      <div className="hero-card">
        <h1>Stay Ahead with Preventive Care</h1>
        <p>
          Track your wellness goals, get timely reminders for checkups, and help providers
          monitor patient health in one simple dashboard.
        </p>
        <div className="hero-actions">
          {!user && (
            <>
              <Link to="/register" className="btn">Get Started</Link>
              <Link to="/login" className="btn btn-outline">Login</Link>
            </>
          )}
          {user?.role === "PATIENT" && (
            <Link to="/patient/dashboard" className="btn">Go to My Dashboard</Link>
          )}
          {user?.role === "PROVIDER" && (
            <Link to="/provider/dashboard" className="btn">Open Provider View</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
