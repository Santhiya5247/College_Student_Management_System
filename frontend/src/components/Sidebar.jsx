import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h4 className="text-center text-white mb-4">Admin Panel</h4>

      <Link to="/dashboard" className="sidebar-link">
        🏠 Dashboard
      </Link>

      <Link to="/add-student" className="sidebar-link">
        ➕ Add Student
      </Link>

      <Link to="/view-students" className="sidebar-link">
        📋 View Students
      </Link>

      <Link to="/search-student" className="sidebar-link">
        🔍 Search Student
      </Link>

      <button
        className="sidebar-link logout border-0 w-100 text-start"
        onClick={handleLogout}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;
