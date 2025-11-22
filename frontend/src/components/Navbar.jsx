import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">WellnessCare</span>
        <Link to="/">Home</Link>
        <Link to="/health-info">Health Info</Link>
        {user?.role === "PATIENT" && <Link to="/patient/dashboard">My Dashboard</Link>}
        {user?.role === "PROVIDER" && <Link to="/provider/dashboard">Provider Dashboard</Link>}
      </div>

      <div className="nav-right">
        {!user && (
          <>
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/register" className="btn">Sign Up</Link>
          </>
        )}
        {user && (
          <>
            <span className="user-chip">{user.name} ({user.role})</span>
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
