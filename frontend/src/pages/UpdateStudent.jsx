import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";
import API from "../services/api";

function UpdateStudent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState({
    name: "",
    age: "",
    gender: "",
    department: "",
    year: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await API.get(`/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to Load Student");
    }
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/students/${id}`, student);

      alert("Student Updated Successfully ✅");

      navigate("/view-students");
    } catch (error) {
      console.error(error);
      alert("Failed to Update Student ❌");
    }
  };
    return (
    <>
      <Header />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">
          <div className="card shadow p-4">
            <h2 className="mb-4">Update Student</h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Student Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={student.age}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={student.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={student.department}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Year</label>
                <input
                  type="number"
                  className="form-control"
                  name="year"
                  value={student.year}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={student.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={student.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="address"
                  value={student.address}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-warning me-2">
                Update Student
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/view-students")}
              >
                Cancel
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateStudent;
