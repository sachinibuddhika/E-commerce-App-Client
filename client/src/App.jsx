import Header from "./components/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import UserInfo from "./pages/UserInfo";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { UserProvider } from "./contexts/UserContext";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <UserProvider>
        <Header />
        <Routes>
          {/* Public roue for login */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="users" element={<Users />} />
          <Route path="user-info" element={<UserInfo />} />
          <Route path="register" element={<Registration />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
