import React, { useState } from "react";
import Alert from "./Alert";

function LoginForm({ handleLogin, alert = null }) {
  const initialFormData = { username: "", password: "" };
  const [formData, setFormData] = useState(initialFormData);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(formData);

  }

  return (
    <div className="container d-flex flex-column align-items-center">
      <h2 className="form-title">Log In</h2>

      <div className="card form-card">
        <form className="NewTodoForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="login-username">Username</label>
            <input
              id="login-username"
              name="username"
              className="form-control"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
              aria-label="Username"
            />
          </div>

          <div className="mb-3">
            <label for="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              name="password"
              className="form-control"
              placeholder="password"
              onChange={handleChange}
              value={formData.password}
              aria-label="password"
            />
          </div>
          <Alert />
          <button className="btn-primary btn col-12">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
