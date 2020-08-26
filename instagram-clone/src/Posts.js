import React from "react";
import "./Posts.css";
import Avatar from "@material-ui/core/Avatar";

function Posts({ userName, caption, imageUrl }) {
  return (
    <div className="posts">
      {/*Header-> Avatar-> Username */}
      <div className="posts__header">
        <Avatar
          className="post__avatar"
          alt={userName}
          src="/static/images/avatar/1.jpg"
        />
        <h4>{userName}</h4>
      </div>

      {/*Image */}
      <img className="posts__image" src={imageUrl} alt="" />

      {/*Caption*/}
      <h4 className="posts__text">
        <strong>{userName}: </strong>
        {caption}
      </h4>
    </div>
  );
}

export default Posts;
