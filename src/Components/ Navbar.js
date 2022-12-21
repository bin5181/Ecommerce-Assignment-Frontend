import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../Context/Auth/AuthContext";

const Navbar = () => {
    const location = useLocation();
    const { currentUser, logoutUser } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Ecommerce
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/" ? "active" : ""
                                    }`}
                                aria-current="page"
                                to="/"
                            >
                                Items
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/cart" ? "active" : ""
                                    }`}
                                to="/cart"
                            >
                                Cart
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === "/orders" ? "active" : ""
                                    }`}
                                to="/orders"
                            >
                                Orders
                            </Link>
                        </li>
                    </ul>
                    {!currentUser ? (
                        <>
                            <Link className="mx-1 btn btn-outline-secondary" to="/login">
                                Login
                            </Link>
                            <Link className="mx-1 btn btn-outline-secondary" to="/signup">
                                SignUp
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={logoutUser}
                            className="mx-1 btn btn-outline-danger"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;