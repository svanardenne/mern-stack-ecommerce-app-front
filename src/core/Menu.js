import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/";
import { itemTotal } from "./cartHelpers";

// Styled Components
const NavLink = styled(Link)`
  :hover {
    border-radius: 0px;
  }
`;
const SignoutLink = styled.span`
  :hover {
    border-radius: 0px;
  }
`;
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};
const CartBadge = styled.small`
  border-radius: 50%;
  padding: 2px 6px 2px 6px;
  font-size: 12px;
  font-style: italic;
  background: #000;
`;

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <NavLink className="nav-link" style={isActive(history, "/")} to="/">
          Home
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink
          className="nav-link"
          style={isActive(history, "/shop")}
          to="/shop"
        >
          Shop
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink
          className="nav-link"
          style={isActive(history, "/cart")}
          to="/cart"
        >
          Cart{" "}
          <sup>
            <CartBadge className="cart-badge">{itemTotal()}</CartBadge>
          </sup>
        </NavLink>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <NavLink
            className="nav-link"
            style={isActive(history, "/user/dashboard")}
            to="/user/dashboard"
          >
            Dashboard
          </NavLink>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <NavLink
            className="nav-link"
            style={isActive(history, "/admin/dashboard")}
            to="/admin/dashboard"
          >
            Dashboard
          </NavLink>
        </li>
      )}

      {!isAuthenticated() && (
        <React.Fragment>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Signin
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Signup
            </NavLink>
          </li>
        </React.Fragment>
      )}
      {isAuthenticated() && (
        <li className="nav-item">
          <SignoutLink
            className="nav-link"
            style={{ cursor: "pointer", color: "#ffffff" }}
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            Signout
          </SignoutLink>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
