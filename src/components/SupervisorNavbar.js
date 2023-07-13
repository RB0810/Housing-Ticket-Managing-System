import { Link, useLocation } from "react-router-dom";
import React from "react";
import "../styles/navbar.css"

export default function SupervisorNavbar() {
  const location = useLocation();
  const { pathname } = location;
  const pathSegments = pathname.split("/");
  const SupervisorID = pathSegments[3];

  return (
    <nav className="nav">
      <Link to={`/supervisorportal/landingpage/${SupervisorID}`} className="site-title">
        <img src="/housingportallogo.png" alt="Logo" />
        <h1 className="site-title">Supervisor Portal</h1>
      </Link>

      <ul>
        <CustomLink to={`/supervisorportal/createtennantacc/${SupervisorID}`}>Create Tenant Account</CustomLink>
        <DropdownLink label="View Tickets" options={["Pending", "Active", "Closed"]} />
        <CustomLink to={`/supervisorportal/profile/${SupervisorID}`}>Profile</CustomLink>
      </ul>
    </nav>
  );
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
    const SupervisorID = pathSegments[3];
  
    const toggleDropdown = () => {
      setIsOpen((prevState) => !prevState);
    };
  
    const handleOptionClick = () => {
      // Reload the page
      window.location.reload();
    };
  
    const resolvedPaths = options.map((option) => ({
      label: option,
      path: `/supervisorportal/tickets/${SupervisorID}/${option.toLowerCase()}`,
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
  