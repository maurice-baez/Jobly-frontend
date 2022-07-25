import React, { useState } from "react";
import Alert from "./Alert";
import { useContext } from "react";
import UserContext from "./userContext";

function ProfileForm({ handleUpdate }) {
  const { currentUser } = useContext(UserContext);
  const initialFormData = {
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  };
  const [formData, setFormData] = useState(initialFormData);

  console.log("form data from profile", formData);
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
    handleUpdate(formData);
  }

  return (
    <div className="container d-flex flex-column align-items-center">
      <h2 className="form-title">Profile</h2>
      <div className="card form-card">
        <form className="NewTodoForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="profile-username">Username</label>
            <input
              disabled
              id="profile-username"
              name="username"
              className="form-control"
              onChange={handleChange}
              value={formData.username}
              aria-label="Username"
            />
          </div>

          <div className="mb-3">
            <label for="profile-firstName">First Name</label>
            <input
              id="profile-firstName"
              name="firstName"
              className="form-control"
              onChange={handleChange}
              value={formData.firstName}
              aria-label="firstName"
            />
          </div>

          <div className="mb-3">
            <label for="profile-lastName">Last Name</label>
            <input
              type="lastName"
              id="profile-lastName"
              name="lastName"
              className="form-control"
              onChange={handleChange}
              value={formData.lastName}
              aria-label="lastName"
            />
          </div>

          <div className="mb-3">
            <label for="profile-email">Email</label>
            <input
              type="email"
              id="profile-email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={formData.email}
              aria-label="email"
            />
          </div>
          <Alert />

          <button className="btn-primary btn col-12">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
