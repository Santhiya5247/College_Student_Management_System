import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";
import API from "../services/api";


function AddStudent() {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    gender: "",
    department: "",
    year: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (student.name.trim() === "") {
      alert("Student Name is required");
      return;
    }

    if (student.age < 1 || student.age > 100) {
      alert("Enter a valid Age");
      return;
    }

    if (student.gender === "") {
      alert("Please select Gender");
      return;
    }

    if (student.department.trim() === "") {
      alert("Department is required");
      return;
    }

    if (student.year < 1 || student.year > 4) {
      alert("Year should be between 1 and 4");
      return;
    }

    if (!student.email.includes("@")) {
      alert("Enter a valid Email");
      return;
    }

    if (student.phone.length !== 10) {
      alert("Phone Number must contain 10 digits");
      return;
    }

    if (student.address.trim() === "") {
      alert("Address is required");
      return;
    }

    try {
      await API.post("/students", student);

      alert("Student Added Successfully ✅");

      setStudent({
        name: "",
        age: "",
        gender: "",
        department: "",
        year: "",
        email: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to Add Student ❌");
    }
  };

  return (
    <>
      <Header />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">
          <div className="card shadow p-4">
            <h2 className="mb-4">Add Student</h2>

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
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="address"
                  value={student.address}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success me-2">
                Save Student
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  setStudent({
                    name: "",
                    age: "",
                    gender: "",
                    department: "",
                    year: "",
                    email: "",
                    phone: "",
                    address: "",
                  })
                }
              >
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddStudent;
