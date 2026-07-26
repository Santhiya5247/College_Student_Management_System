import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";
import API from "../services/api";

function ViewStudents() {
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();
  const { department, year } = useParams();

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  useEffect(() => {
    if (department && year) {
      fetchStudents();
    }
  }, [department, year]);

  const fetchStudents = async () => {
    try {
      const response = await API.get(
        `/students?department=${department}&year=${encodeURIComponent(year)}`
      );

      setStudents(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to Load Students");
    }
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/students/${id}`);

      alert("Student Deleted Successfully ✅");

      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Failed to Delete Student ❌");
    }
  };

  // Department selected → Show Year Cards
  if (department && !year) {
    return (
      <>
        <Header />

        <div className="dashboard-container">
          <Sidebar />

          <div className="dashboard-content">

            <h2 className="mb-4">{department} Department</h2>

            <h4 className="mb-3">Select Year</h4>

            <div className="row">

              {years.map((item) => (

                <div className="col-md-4 mb-4" key={item}>

                  <div
                    className="card text-center shadow dashboard-card"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(
                        `/view-students/${department}/${encodeURIComponent(item)}`
                      )
                    }
                  >

                    <div className="card-body">

                      <h4>{item}</h4>

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

  // Department + Year selected → Show Students
  return (
    <>
      <Header />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">

          <div className="card shadow p-4">

            <h2 className="mb-4">
              {department} - {year} Students
            </h2>

            <div className="table-responsive">

              <table className="table table-bordered table-striped table-hover">

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
                    <th>Address</th>
                    <th style={{ width: "180px" }}>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {students.length > 0 ? (

                    students.map((student, index) => (

                      <tr key={student.id}>

                        <td>{index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.gender}</td>
                        <td>{student.department}</td>
                        <td>{student.year}</td>
                        <td>{student.phone}</td>
                        <td>{student.email}</td>
                        <td>{student.address}</td>

                        <td>

                          <div className="d-flex gap-2 justify-content-center">

                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() =>
                                navigate(`/update-student/${student.id}`)
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                deleteStudent(student.id)
                              }
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>
                      <td colSpan="10" className="text-center">
                        No Students Found
                      </td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default ViewStudents;
