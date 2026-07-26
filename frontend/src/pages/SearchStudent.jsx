import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";
import API from "../services/api";

function SearchStudent() {
  const [keyword, setKeyword] = useState("");
  const [students, setStudents] = useState([]);

  const searchStudent = async () => {
    if (keyword.trim() === "") {
      alert("Please enter ID, Name or Department");
      return;
    }

    try {
      const response = await API.get(`/students/search/${keyword}`);
      setStudents(response.data);
    } catch (error) {
      console.error(error);
      alert("Search Failed");
    }
  };

  return (
    <>
      <Header />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">
          <div className="card shadow p-4">

            <h2 className="mb-4">Search Student</h2>

            <div className="row mb-4">

              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by ID, Name or Department"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <button
                  className="btn btn-primary w-100"
                  onClick={searchStudent}
                >
                  Search
                </button>
              </div>

            </div>

            <table className="table table-bordered table-hover">

              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>

                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                      <td>{student.gender}</td>
                      <td>{student.department}</td>
                      <td>{student.year}</td>
                      <td>{student.phone}</td>
                      <td>{student.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No Student Found
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>
        </div>
      </div>
    </>
  );
}

export default SearchStudent;
