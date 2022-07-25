import { useContext } from "react";
import AlertContext from "./alertContext";

function Alert() {
  const { alert } = useContext(AlertContext);

  return (
    <div>
      {alert.error && alert.error.length > 0 && (
        <div className="alert alert-danger" role="alert">
          {alert.error.map((e) => (
            <p>{e}</p>
          ))}
        </div>
      )}
      {alert.success && alert.success.length > 0 && (
        <div className="alert alert-success" role="alert">
          {alert.success.map((e) => (
            <p>{e}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Alert;