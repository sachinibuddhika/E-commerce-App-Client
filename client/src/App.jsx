import Header from "./components/Header";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { UserProvider } from "./contexts/UserContext";
import PrivateRoute from "./utils/PrivateRoute";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import CartProvider from "./contexts/CartContext";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <div>
      <UserProvider>
        <CartProvider>
          <Header />
          <Routes>
            {/* Public route for login and others*/}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="register" element={<Registration />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="users" element={<Users />} />

            {/* Private route for dashboard, accessible only by logged-in users */}
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />

            <Route
              path="search"
              element={
                <PrivateRoute>
                  <SearchResults />
                </PrivateRoute>
              }
            />
          </Routes>
        </CartProvider>
      </UserProvider>
      <Footer />
    </div>
  );
}

export default App;
