import React, { useState } from "react";
import {
  BiAddToQueue,
  BiAlignMiddle,
  BiData,
  BiEdit,
  BiDesktop,
  BiLogOut,
} from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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
      path: "/logout",
      name: "Log Out",
      icon: <BiLogOut />,
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
            activeclassname="active"
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
