import React, { useState, useEffect } from "react";
import "./App.css";
import Posts from "./Posts";
import { db } from "./firebase";

function App() {
  const [posts, setPosts] = useState([
    // {
    //   userName: "ishan",
    //   caption: "Test Caption 1",
    //   imageUrl: "https://picsum.photos/200",
    // },
    // {
    //   userName: "captain",
    //   caption: "Test Caption 2",
    //   imageUrl: "https://picsum.photos/200",
    // },
    // {
    //   userName: "boogey",
    //   caption: "Test Caption 3",
    //   imageUrl: "https://picsum.photos/200",
    // },
  ]);
  //useEffect->Runs code on specific condition
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      //Everytime new post is added this code will be fired
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  return (
    <div className="app">
      {/*Header*/}
      <div className="app__header">
        <h4>Instagram</h4>
      </div>
      {/*Posts*/}

      {posts.map((posts) => (
        <Posts
          userName={posts.userName}
          caption={posts.caption}
          imageUrl={posts.imageUrl}
        />
      ))}

      {/* <Posts
        userName="ishan"
        caption="Random String 1"
        imageUrl="https://picsum.photos/200"
      />
      <Posts
        userName="ishan"
        caption="Random String 1"
        imageUrl="https://picsum.photos/200"
      />
      <Posts
        userName="ishan"
        caption="Random String 1"
        imageUrl="https://picsum.photos/200"
      />
      <Posts
        userName="ishan"
        caption="Random String 1"
        imageUrl="https://picsum.photos/200"
      /> */}
      {/*Header*/}
    </div>
  );
}

export default App;
