import React, { useState, useEffect } from "react";
import "./App.css";
import Posts from "./Posts";
import { db } from "./firebase";



function App() {
  const [posts, setPosts] = useState([]);
  //useEffect->Runs code on specific condition
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id, posts: doc.data()
      })));
    })
  }, []);

  return (

    < div className="app" >
      {/*Header*/}
      < div className="app__header" >
        <h4>Instagram</h4>

      </div >
      {/*Posts*/}
      {
        posts.map(({ id, posts }) => (
          <Posts
            key={id}
            userName={posts.userName}
            caption={posts.caption}
            imageUrl={posts.imageUrl}
          />
        ))
      }
    </div >
  );
}

export default App;
