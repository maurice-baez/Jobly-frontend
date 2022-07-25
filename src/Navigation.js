import { NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./userContext";

function Navigation({ handleLogout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="m-2">
          <NavLink to="/">Jobly</NavLink>
        </span>
        <div>
          {currentUser ? (
            <div>
              <span className="m-2">
                <NavLink to="/companies">Companies</NavLink>
              </span>
              <span className="m-2">
                <NavLink to="/jobs">Jobs</NavLink>
              </span>
              <span className="m-2">
                <NavLink to="/profile">Profile</NavLink>
              </span>
              <span className="m-2">
                <NavLink to="/" onClick={handleLogout}>
                  Log out {currentUser.username}{" "}
                </NavLink>
              </span>
            </div>
          ) : (
            <div>
              <span className="m-2">
                <NavLink to="/login">Login</NavLink>
              </span>
              <span className="m-2">
                <NavLink to="/signup">Sign Up</NavLink>
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
