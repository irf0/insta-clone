import { Avatar } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
// import pic from "../assets/irfan pic.png";
import "./Posts.css";

function Posts({ username, caption, imageURL }) {
  const [likesCount, setLikesCount] = useState([]);
  // const { currentUser } = useAuth();
  return (
    <div className="posts" style={{ position: "relative" }}>
      <div className="post-header">
        <Avatar className="avatar-img" alt="M Irfan" src={imageURL} />
        <h4 style={{ marginLeft: "1%" }}>{username}</h4>
      </div>

      <img className="posts-img" src={imageURL} alt="" />
      {/* Comment and like icons here*/}

      <div className="post-icons">
        <i
          className="fa-regular fa-heart"
          id="icon1"
          onClick={() => setLikesCount + 1}
          style={{ cursor: "pointer" }}
        ></i>
        <i className="fa-regular fa-comment" id="icon2"></i>
        <i className="fa-regular fa-paper-plane" id="icon3"></i>
      </div>
      <div className="post-bookmark">
        <i className="fa-regular fa-bookmark" id="icon4"></i>
      </div>
      <h4></h4>
      <strong
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: "2%",
        }}
      >
        {/* {likesCount} */}
        <span style={{ fontWeight: "bold", marginLeft: "5px" }}>likes</span>
      </strong>

      <div className="post-caption">
        <h4>
          <strong style={{ marginRight: "12px" }}>{username}</strong>
          {caption}
        </h4>
      </div>
    </div>
  );
}

export default Posts;
