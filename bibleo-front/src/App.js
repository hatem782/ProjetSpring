import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import BooksPage from "./pages/Library/BooksPage/BooksPage";
import OneBookDetails from "./pages/Library/OneBookDetails/OneBookDetails";
import Logout from "./pages/Dashboard/Logout/Logout";
import AdherantEmprunts from "./pages/Library/AdherantEmprunts/AdherantEmprunts";
import Toast from "./utils/Toast";

function App() {
  const role = useSelector((state) => state.UserReducers.role);

  return (
    <div className="App">
      <Toast />
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
      <Route path="/library/my-emprunts" element={<AdherantEmprunts />} />
      <Route path="/library/books" element={<BooksPage />} />
      <Route path="/library/book/:id" element={<OneBookDetails />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/*" element={<Navigate to="/library/books" />} />
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
