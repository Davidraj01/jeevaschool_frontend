import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock, ShieldAlert, User } from "lucide-react";
import { apiService } from "../services/api";
import { startAdminSession } from "../services/adminSession";

export default function AdminLogin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(
        location.state?.unauthorized
            ? "Security Alert: Access denied due to invalid or unauthorized credentials."
            : "",
    );
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        if (!username.trim() || !password) {
            setMessage("Security Alert: Username and password are required.");
            return;
        }

        setLoading(true);
        try {
            const response = await apiService.login({
                username: username.trim(),
                password,
                require_2fa: false,
            });
            if (response?.success) {
                startAdminSession();
                navigate("/admin/dashboard", { replace: true });
            }
        } catch (error) {
            setMessage(
                error.message ||
                    "Security Alert: Access denied due to invalid or unauthorized credentials.",
            );
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "0.85rem 1rem 0.85rem 2.75rem",
        borderRadius: "12px",
        background: "#e8eefb",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        color: "#111827",
        fontSize: "0.95rem",
        outline: "none",
        boxSizing: "border-box",
    };

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                padding: "1.5rem",
                background: "linear-gradient(135deg, #070b15, #101a32)",
                color: "#f8fafc",
            }}
        >
            <section
                style={{
                    width: "100%",
                    maxWidth: "460px",
                    padding: "2.75rem",
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "24px",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.45)",
                }}
            >
                <header style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <img
                        src="/images/logo.png"
                        alt="Jeeva Matric School Logo"
                        style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            objectFit: "contain",
                            background: "#fff",
                            padding: "3px",
                            marginBottom: "1rem",
                        }}
                    />
                    <h1
                        style={{
                            fontSize: "1.65rem",
                            margin: 0,
                            color: "#fff",
                        }}
                    >
                        Admin Access Portal
                    </h1>
                </header>

                {message && (
                    <div
                        role="alert"
                        style={{
                            display: "flex",
                            gap: "0.65rem",
                            padding: "0.85rem 1rem",
                            marginBottom: "1.25rem",
                            borderRadius: "10px",
                            background: "rgba(239,68,68,0.15)",
                            border: "1px solid rgba(239,68,68,0.45)",
                            color: "#fecaca",
                            fontSize: "0.88rem",
                        }}
                    >
                        <ShieldAlert size={19} style={{ flexShrink: 0 }} />
                        <span>{message}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <label
                        htmlFor="admin-username"
                        style={{
                            display: "block",
                            marginBottom: "0.4rem",
                            color: "#cbd5e1",
                            fontSize: "0.85rem",
                        }}
                    >
                        Username
                    </label>
                    <div
                        style={{
                            position: "relative",
                            marginBottom: "1.25rem",
                        }}
                    >
                        <User
                            size={18}
                            style={{
                                position: "absolute",
                                left: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#64748b",
                            }}
                        />
                        <input
                            id="admin-username"
                            type="text"
                            autoComplete="username"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            style={inputStyle}
                        />
                    </div>

                    <label
                        htmlFor="admin-password"
                        style={{
                            display: "block",
                            marginBottom: "0.4rem",
                            color: "#cbd5e1",
                            fontSize: "0.85rem",
                        }}
                    >
                        Password
                    </label>
                    <div
                        style={{ position: "relative", marginBottom: "1.5rem" }}
                    >
                        <Lock
                            size={18}
                            style={{
                                position: "absolute",
                                left: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#64748b",
                            }}
                        />
                        <input
                            id="admin-password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            style={inputStyle}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "0.85rem",
                            border: 0,
                            borderRadius: "12px",
                            background:
                                "linear-gradient(135deg, #d97706, #b45309)",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "0.98rem",
                            cursor: loading ? "wait" : "pointer",
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? "Signing in..." : "Sign in to Admin Panel"}
                    </button>
                </form>
            </section>
        </main>
    );
}
