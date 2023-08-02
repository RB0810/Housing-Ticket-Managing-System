import { Link, useLocation } from "react-router-dom";
import React from "react";
import "../styles/navbar.css"
import Authentication from "../managers/authentication.js"

export default function AdminNavbar() {
  const location = useLocation();
  const { pathname } = location;
  const pathSegments = pathname.split("/");
  const AdminID = pathSegments[3];

  return (
    <nav className="nav">
      <Link to={`/adminportal/landingpage/${AdminID}`} className="site-title">
        <img src="/housingportallogo.png" alt="Logo" />
        <h1 className="site-title">Admin Portal</h1>
      </Link>

      <ul>
      <DropdownLink label="Create Landlord Account" options={["Supervisor", "Staff"]} />
        <CustomLink to={`/adminportal/manageacc/${AdminID}`}>Manage Accounts</CustomLink>
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </nav>
  );
}

function handleLogout(){
  const authentication = new Authentication();
  authentication.logout();
}

function CustomLink({ to, children }) {
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  );
}

function DropdownLink({ label, options }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();
    const { pathname } = location;
    const pathSegments = pathname.split("/");
    const AdminID = pathSegments[3];
  
    const toggleDropdown = () => {
      setIsOpen((prevState) => !prevState);
    };
  
    const handleOptionClick = () => {
      // Reload the page
      window.location.reload();
    };
  
    const resolvedPaths = options.map((option) => ({
      label: option,
      path: `/adminportal/create${option.toLowerCase()}acc/${AdminID}`,
    }));
  
    return (
      <li className={`dropdown ${isOpen ? "open" : ""}`}>
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          {label} <span className="arrow">&#9662;</span>
        </button>
        {isOpen && (
          <ul className="dropdown-menu vertical">
            {resolvedPaths.map((resolvedPath) => (
              <li key={resolvedPath.label} onClick={handleOptionClick}>
                <Link to={resolvedPath.path}>{resolvedPath.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }
  

