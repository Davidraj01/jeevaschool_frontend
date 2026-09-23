import React, { useEffect, useState } from "react";
import {
  Check,
  Edit3,
  Plus,
  ShieldCheck,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { apiService } from "../services/api";

const ROLES = ["Super Admin", "Admin", "Teacher", "Content Editor"];
const PERMISSIONS = [
  "Manage admissions",
  "Manage blogs",
  "Manage gallery",
  "Manage videos",
  "Manage events",
  "Manage feedback",
  "Manage SEO",
  "Manage users",
];
const EMPTY_FORM = {
  name: "",
  username: "",
  email: "",
  role: "Teacher",
  permissions: [],
};
const DEMO_USERS = [
  {
    id: 1,
    name: "Principal Admin",
    username: "admin",
    email: "jmhas2002@gmail.com",
    role: "Super Admin",
    permissions: PERMISSIONS,
  },
  {
    id: 2,
    name: "Dr. Marcus Vance",
    username: "marcus_v",
    email: "marcus@apexschool.edu",
    role: "Teacher",
    permissions: ["Manage blogs", "Manage events"],
  },
  {
    id: 3,
    name: "Elena Rostova",
    username: "elena_r",
    email: "elena@apexschool.edu",
    role: "Content Editor",
    permissions: ["Manage gallery", "Manage videos"],
  },
];

export default function UserManager() {
  const [users, setUsers] = useState(DEMO_USERS);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUsingApi, setIsUsingApi] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    apiService
      .getUsers()
      .then((data) => {
        setUsers(data);
        setIsUsingApi(true);
      })
      .catch(() =>
        setError("Showing sample users until the backend is available."),
      );
  }, []);

  const openCreate = () => {
    setEditingUser(null);
    setFormData(EMPTY_FORM);
    setError("");
    setIsModalOpen(true);
  };
  const openEdit = (user) => {
    setEditingUser(user);
    setFormData({ ...user, permissions: user.permissions || [] });
    setError("");
    setIsModalOpen(true);
  };
  const togglePermission = (permission) =>
    setFormData((current) => ({
      ...current,
      permissions: current.permissions.includes(permission)
        ? current.permissions.filter((item) => item !== permission)
        : [...current.permissions, permission],
    }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const saved = isUsingApi
        ? editingUser
          ? await apiService.updateUser(editingUser.id, formData)
          : await apiService.createUser(formData)
        : { ...formData, id: editingUser?.id || Date.now() };
      setUsers((current) =>
        editingUser
          ? current.map((user) => (user.id === editingUser.id ? saved : user))
          : [...current, saved],
      );
      setIsModalOpen(false);
    } catch (requestError) {
      setError(
        requestError.message || "Unable to save this user. Please try again.",
      );
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete ${user.name}? This action cannot be undone.`))
      return;
    try {
      if (isUsingApi) await apiService.deleteUser(user.id);
      setUsers((current) => current.filter((item) => item.id !== user.id));
    } catch (requestError) {
      setError(requestError.message || "Unable to delete this user.");
    }
  };

  return (
    <section className="user-manager">
      <div className="user-manager__header">
        <div>
          <div className="user-manager__eyebrow">
            <ShieldCheck size={17} /> Access control
          </div>
          <h1>User &amp; Role Management</h1>
          <p>
            Assign roles and fine-grained permissions to your administrative
            staff.
          </p>
        </div>
        <button onClick={openCreate} className="btn btn-gold">
          <Plus size={18} /> Add new user
        </button>
      </div>
      {error && (
        <div className="user-manager__notice" role="status">
          {error}
        </div>
      )}
      <div className="admin-table-container user-manager__table-wrap">
        <table className="admin-table user-manager__table">
          <thead>
            <tr>
              <th>User</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Permissions</th>
              <th aria-label="Actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td data-label="User">
                  <span className="user-manager__person">
                    <span className="user-manager__avatar">
                      {user.name.charAt(0)}
                    </span>
                    <strong>{user.name}</strong>
                  </span>
                </td>
                <td data-label="Username">
                  <code>{user.username}</code>
                </td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Role">
                  <span className="badge badge-published">{user.role}</span>
                </td>
                <td data-label="Permissions">
                  <span className="user-manager__permission-summary">
                    {user.permissions?.length
                      ? user.permissions.join(", ")
                      : "No permissions assigned"}
                  </span>
                </td>
                <td data-label="Actions">
                  <div className="user-manager__actions">
                    <button
                      className="user-manager__icon-button"
                      onClick={() => openEdit(user)}
                      aria-label={`Edit ${user.name}`}
                      title="Edit user"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      className="user-manager__icon-button user-manager__icon-button--delete"
                      onClick={() => handleDelete(user)}
                      aria-label={`Delete ${user.name}`}
                      title="Delete user"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div
          className="modal-overlay"
          onMouseDown={() => setIsModalOpen(false)}
        >
          <div
            className="modal-card user-manager__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-form-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="user-manager__modal-heading">
              <div>
                <h2 id="user-form-title">
                  {editingUser ? "Edit user access" : "Add new user"}
                </h2>
                <p>Set their account details, role, and permissions.</p>
              </div>
              <button
                className="user-manager__close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="user-manager__form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="user-name">
                    Full name *
                  </label>
                  <input
                    id="user-name"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="user-username">
                    Username *
                  </label>
                  <input
                    id="user-username"
                    className="form-control"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group user-manager__form-span">
                  <label className="form-label" htmlFor="user-email">
                    Email address *
                  </label>
                  <input
                    id="user-email"
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group user-manager__form-span">
                  <label className="form-label" htmlFor="user-role">
                    Assigned role
                  </label>
                  <select
                    id="user-role"
                    className="form-control"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <fieldset className="user-manager__permissions">
                <legend>Permissions</legend>
                <p>Select the areas this user can manage.</p>
                <div className="user-manager__permission-grid">
                  {PERMISSIONS.map((permission) => (
                    <label
                      key={permission}
                      className={`user-manager__permission-option ${formData.permissions.includes(permission) ? "is-selected" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={() => togglePermission(permission)}
                      />
                      <span>
                        <Check size={14} />
                      </span>
                      {permission}
                    </label>
                  ))}
                </div>
              </fieldset>
              {error && <p className="user-manager__form-error">{error}</p>}
              <div className="user-manager__form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold">
                  <UserRound size={17} />
                  {editingUser ? "Save changes" : "Create user"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
