import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">

        <Navbar />

        <div className="container mt-4">

          <Routes>

            {/* Default Page */}
            <Route
              path="/"
              element={<Dashboard />}
            />

            {/* Add Task */}
            <Route
              path="/add-task"
              element={<AddTask />}
            />

            {/* Invalid Route Redirect */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;