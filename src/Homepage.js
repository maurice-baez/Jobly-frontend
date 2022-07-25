import UserContext from "./userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Homepage() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="home container text-center">
      <div className="">
        <h1 className="jobly-title fw-bolder">Jobly</h1>
        <h3 className="home-text fw-bolder mt-3 mb-3">
          All the jobs in one, convenient place.
        </h3>
        {currentUser ? (
          <h4 className="home-text fw-bolder">
            Welcome back, {currentUser.firstName}
          </h4>
        ) : (
          <div className="">
            <Link to="/login">
              <button className="btn btn-primary m-2">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-primary m-2">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
