import React, { useState } from "react";
import {
  BiAddToQueue,
  BiAlignMiddle,
  BiData,
  BiEdit,
  BiDesktop,
  BiLogOut,
} from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ handleLogout, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    handleLogout()
  }
  //   axios
  //     .post("http://localhost:8000/api/logout") // Assuming the logout endpoint is '/api/logout'
  //     .then(() => {
  //       handleLogout();
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.error("Logout failed:", error);
  //     });
  // };

  const menuItem = [
    {
      path: "/edit/:id",
      name: "Edit Profile",
      icon: <BiEdit />,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <BiDesktop />,
    },
    {
      path: "/create",
      name: "Create",
      icon: <BiAddToQueue />,
    },
    {
      path: "/metrics",
      name: "Metrics",
      icon: <BiData />,
    },
    {
      path: "/",
      name: "Log Out",
      icon: <BiLogOut />,
      onClick: logout, // Call the logout function to handle logout
    },
  ];

  return (
    <div className="container">
      <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <BiAlignMiddle onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
            onClick={item.onClick} // Handle click event for logout item
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;