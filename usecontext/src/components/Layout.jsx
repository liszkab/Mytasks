import { Link, Outlet } from "react-router-dom";

const Layout = () => (
  <div>
    <Link to="/">Home</Link>

    <Link to="/login">Login</Link>

    <Link to="/register">Register</Link>

    <Outlet />
  </div>
);

export default Layout;
