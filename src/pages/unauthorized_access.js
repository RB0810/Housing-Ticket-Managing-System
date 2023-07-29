import { Link } from "react-router-dom";

export default function UnauthorizedAccess() {
  return (
    <div className="page-card">
      <h1>You cannot access this page.</h1>
      <h1>Please login to your account.</h1>
        <Link to={"/"}>
          <button>
            Go to Login Page
          </button>
        </Link>
      </div>
  );
};

