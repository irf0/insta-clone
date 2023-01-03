import React from "react";
import "./MobileFooter.css";
import { Avatar, Box, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function MobileFooter() {
  return (
    <div className="mobile-footer">
      <div className="header-items">
        <div className="header-icons">
          <i className="fa-solid fa-house"></i>

          <i
            className="fa-solid fa-magnifying-glass"
            style={{ marginLeft: "30%" }}
          ></i>
          <i
            className="fa-regular fa-square-plus"
            style={{ marginLeft: "45%" }}
          ></i>

          <i className="fa-regular fa-heart"></i>
          <i className="fa-regular fa-circle"></i>
        </div>

        {/* <Avatar /> */}
      </div>

      {/* <Logout /> */}
    </div>
  );
}

export default MobileFooter;
