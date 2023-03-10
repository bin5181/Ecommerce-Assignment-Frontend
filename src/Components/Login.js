import React, { useState, useContext } from "react";
import AuthContext from "../Context/Auth/AuthContext";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const { loginUser } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(credentials);
    };

    const handleChange = () => {
        setCredentials({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        });
    };

    return (
        <div className="container my-3">
            <h2>Login to the website</h2>
            <hr />
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        value={credentials.email}
                        onChange={handleChange}
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your email here"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        value={credentials.password}
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter password here"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;