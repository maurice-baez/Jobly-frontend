import "./App.css";
import RouteList from "./RouteList";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserContext from "./userContext";
import AlertContext from "./alertContext";
import JoblyApi from "./api";
import Loading from "./Loading";
import jwt from "jwt-decode";

/** Site application.
 *
 * App -> [Navigation, RouteList]
 **/

function App() {
  const initialAlerts = { error: [], success: [] };

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(window.localStorage.token);
  const [alert, setAlert] = useState(initialAlerts);

  const navigate = useNavigate();

  useEffect(
    function addCurrUserToState() {
      async function getUser() {
        try {
          const username = jwt(token).username;
          JoblyApi.token = token;
          const currentUser = await JoblyApi.getUser(username);
          // setCurrentUser({}...currentUser, application: new Set()});
          setCurrentUser(currentUser);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
        setIsLoading(false);
      }
      getUser();
    },
    [token]
  );

  function handleToken(token) {
    JoblyApi.token = token;
    setToken(token);
    window.localStorage.token = token;
  }

  async function handleLogin(formData) {
    try {
      const tokenFromApi = await JoblyApi.login(formData);
      handleToken(tokenFromApi);
      navigate("/");
    } catch (err) {
      setAlert({ error: err });
    }
    setTimeout(resetAlerts, 10000);
    setIsLoading(false);
  }

  async function handleRegister(formData) {
    try {
      const tokenFromApi = await JoblyApi.register(formData);
      handleToken(tokenFromApi);
      navigate("/companies");
    } catch (err) {
      setAlert({ error: err });
    }
    setTimeout(resetAlerts, 10000);
    setIsLoading(false);
  }

  async function handleUpdate(formData) {
    try {
      const response = await JoblyApi.update(formData);
      setCurrentUser(response);
      setAlert({ success: ["Profile successfuly updated"] });
      navigate("/profile");
    } catch (err) {
      setAlert({ error: err });
    }
    setTimeout(resetAlerts, 10000);
    setIsLoading(false);
  }

  async function handleApplications(jobId) {
    const jobsApplied = new Set(currentUser.applications);

    if (jobsApplied.has(jobId)) {
      try {
        await JoblyApi.unApply(currentUser.username, jobId);
        const updatedUser = await JoblyApi.getUser(currentUser.username);
        setCurrentUser(updatedUser);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await JoblyApi.apply(currentUser.username, jobId);
        const updatedUser = await JoblyApi.getUser(currentUser.username);
        setCurrentUser(updatedUser);
      } catch (err) {
        console.log(err);
      }
    }
  }

  function handleLogout() {
    JoblyApi.token = null;
    setCurrentUser(null);
    window.localStorage.token = null;
  }

  function resetAlerts() {
    setAlert(initialAlerts);
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser }}>
        <AlertContext.Provider value={{ alert }}>
          <Navigation handleLogout={handleLogout} />
          {isLoading ? (
            <Loading />
          ) : (
            <RouteList
              handleApplications={handleApplications}
              handleLogin={handleLogin}
              handleRegister={handleRegister}
              handleUpdate={handleUpdate}
              alert={alert}
            />
          )}
        </AlertContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
