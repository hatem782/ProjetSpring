import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";

function App() {
  const role = useSelector((state) => state.UserReducers.role);

  return (
    <div className="App">
      {role === "admin" && <AdminRoutes />}
      {role === "adherant" && <AdherantRoutes />}
      {role === null && <GuestRoutes />}
    </div>
  );
}

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/*" element={<Navigate to="/dashboard/main" />} />
    </Routes>
  );
};

const AdherantRoutes = () => {
  return (
    <Routes>
      <Route path="/library/*" element={<h1>Welcome to library</h1>} />
      <Route path="/*" element={<Navigate to="/library/main" />} />
    </Routes>
  );
};

const GuestRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
