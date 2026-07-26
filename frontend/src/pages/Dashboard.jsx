import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    total: 0,
  });

  const departments = [
    "CSE",
    "IT",
    "ECE",
    "EEE",
    "MECH",
    "CIVIL",
  ];

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await API.get("/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to Load Dashboard Data");
    }
  };

  return (
    <>
      <Header />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">

          <h2 className="mb-4">Dashboard</h2>

          {/* Total Students Card */}

          <div className="row mb-4">

            <div className="col-md-4">

              <div
                className="card text-center shadow dashboard-card"
                onClick={() => navigate("/view-students")}
                style={{ cursor: "pointer" }}
              >

                <div className="card-body">

                  <h5>Total Students</h5>

                  <h2>{dashboard.total}</h2>

                </div>

              </div>

            </div>

          </div>

          {/* Department Cards */}

          <h4 className="mb-3">Departments</h4>

          <div className="row">

            {departments.map((dept) => (

              <div className="col-md-4 mb-4" key={dept}>

                <div
                  className="card text-center shadow dashboard-card"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/view-students/${dept}`)
                  }
                >

                  <div className="card-body">

                    <h5>{dept}</h5>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;
