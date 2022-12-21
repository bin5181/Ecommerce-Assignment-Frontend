import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../../Hooks/Request";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
    const HOST = process.env.REACT_APP_BACKEND_URL + "/auth";

    const [currentUser, setCurrentUser] = useState(null);
    const checkRequest = useRequest();
    const history = useNavigate();

    // Get User
    const getUser = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) {
            setCurrentUser(null);
            history("/login");
            return;
        }
        const response = await fetch(HOST + "/fetch", {
            method: "POST",
            headers: {
                "auth-token": token
            },
        });
        const json = await response.json();
        checkRequest(
            response.status,
            json.error,
            null,
            async () => {
                setCurrentUser(json);
            }
        );
    }

    // Logging In
    const loginUser = async ({ email, password }) => {
        const response = await fetch(HOST + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const json = await response.json();
        checkRequest(
            response.status,
            json.error,
            "Logged in successfully",
            async () => {
                localStorage.setItem("token", JSON.stringify(json.authToken));
                history("/");
            }
        );
    };

    // Logout
    const logoutUser = () => {
        localStorage.removeItem("token");
        checkRequest(200, null, "Logged out successfully", () => {
            setCurrentUser(null);
            history("/login");
        });
    }

    // Registering
    const registerUser = async ({ name, email, password, cPassword }) => {
        if (password === cPassword) {
            const response = await fetch(HOST + "/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
            const json = await response.json();
            checkRequest(
                response.status,
                json.error,
                "Registered successfully",
                async () => {
                    localStorage.setItem("token", JSON.stringify(json.authToken));
                    history("/");
                }
            );
        } else {
            checkRequest(404, "Passwords do not match", null, () => { });
        }
    };

    return (
        <AuthContext.Provider value={{
            getUser, loginUser, logoutUser, registerUser,
            currentUser
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;