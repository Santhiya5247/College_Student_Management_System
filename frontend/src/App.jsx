import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import ViewStudents from "./pages/ViewStudents";
import UpdateStudent from "./pages/UpdateStudent";
import SearchStudent from "./pages/SearchStudent";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Add Student */}
        <Route
          path="/add-student"
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          }
        />

        {/* View All Students */}
        <Route
          path="/view-students"
          element={
            <ProtectedRoute>
              <ViewStudents />
            </ProtectedRoute>
          }
        />
        {/* View Students by Department and Year */}
        <Route
          path="/view-students/:department/:year"
          element={
           <ProtectedRoute>
              <ViewStudents />
           </ProtectedRoute>
        }
      />        

        {/* View Students by Department */}
        <Route
          path="/view-students/:department"
          element={
            <ProtectedRoute>
              <ViewStudents />
            </ProtectedRoute>
          }
        />

        {/* Update Student */}
        <Route
          path="/update-student/:id"
          element={
            <ProtectedRoute>
              <UpdateStudent />
            </ProtectedRoute>
          }
        />

        {/* Search Student */}
        <Route
          path="/search-student"
          element={
            <ProtectedRoute>
              <SearchStudent />
            </ProtectedRoute>
          }
        />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
