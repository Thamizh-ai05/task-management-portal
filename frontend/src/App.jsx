import "bootstrap/dist/css/bootstrap.min.css";

import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import Navbar from "./components/Navbar";

function App() {

    return (
        <BrowserRouter>

            <Navbar />

            <div className="container mt-3">

                <Link
                    to="/"
                    className="btn btn-secondary me-2"
                >
                    Dashboard
                </Link>

                <Link
                    to="/add"
                    className="btn btn-primary"
                >
                    Add Task
                </Link>

            </div>

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/add"
                    element={<AddTask />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;