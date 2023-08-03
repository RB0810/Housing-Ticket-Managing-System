import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title" id="nav-bar-homepage">
        <img src="/housingportallogo.png"></img>
        <h1 className="site-title">Housing Portal</h1>
      </Link>

      <ul>
        <CustomLink to="/tenantlogin" id="nav-bar-tenant-page">Tenant Login</CustomLink>
        <CustomLink to="/landlordlogin" id="nav-bar-landlord-page">Landlord Login</CustomLink>
        <CustomLink to="/adminlogin" id="nav-bar-admin-page">Admin Login</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  // useMatch hook - compares the current path to the path
  // useResolvedPath hook - takes a relative path and gives you full path that you are accessing

  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true }); // Entire path must match

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
