import React, { useState, useEffect } from "react";
import "./App.css";
import Posts from "./Posts";
import { db, auth } from "./firebase";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core'



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const modalStyle = React.useState[getModalStyle];
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [UserName, setUsername] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  //useEffect->Runs code on specific condition
  useEffect(() => {
    auth.onAuthStateChanged(authUser)
  }, []);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      //Everytime new post is added this code will be fired
      setPosts(snapshot.docs.map((doc) => doc.data()));
    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(Email, Password)
      .catch((error) => alert(error.message))
  }


  return (
    <div className="app">
      {/*Header*/}
      <Modal
        open={open}
        onClose={() => setOpen(false)} >
        {<div style={modalStyle} className={classes.paper}>
          <form action="" className="app__signUp">
            <center>
              <h4>Instagram</h4>
              <input type="username" placeholder="username" value={UserName} onChange={(e) => setUsername(e.target.value)} />
              <input type="email" placeholder="email" value={Email} onChange={(e) => setEmail(e.target.value)} />
              <input type="passoword" placeholder="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
              <br />
              <Button type="submit" onClick={signUp}>SignUp</Button>
            </center>

          </form>
        </div>}
      </Modal>
      <div className="app__header">
        <h4>Instagram </h4>
      </div>
      <Button onClick={() => setOpen(true)}>Sign Up</Button>
      {/*Posts*/}
      {
        posts.map((posts) => (
          <Posts
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
