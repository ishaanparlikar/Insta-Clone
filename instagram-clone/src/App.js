import React, { useState, useEffect } from "react";
import "./App.css";
import Posts from "./Posts";
import { db, auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input, InstagramIcon } from "@material-ui/core";
import Upload from "./Upload";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const modalStyle = React.useState[getModalStyle];
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [UserName, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  //useEffect->Runs code on specific condition
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, UserName]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      //Everytime new post is added this code will be fired
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(Email, Password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: UserName,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };
  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(Email, Password)
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  return (
    <div className="app">
      {/*Header*/}
      <div className="Model">
        <Modal open={open} onClose={() => setOpen(false)}>
          {
            <div style={modalStyle} className={classes.paper}>
              <form className="app__signUp">
                <center>
                  <h4>Instagram</h4>
                </center>
                <input
                  type="username"
                  placeholder="username"
                  value={UserName}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />

                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={signUp}
                >
                  Sign-Up
                </Button>
              </form>
            </div>
          }
        </Modal>
        <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
          {
            <div style={modalStyle} className={classes.paper}>
              <form className="app__signUp">
                <center>
                  <h4>Instagram</h4>
                </center>
                <input
                  type="email"
                  placeholder="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />

                <Button
                  type="submit"
                  color="default"
                  variant="contained"
                  onClick={signIn}
                >
                  Sign In
                </Button>
              </form>
            </div>
          }
        </Modal>
      </div>

      <div className="app__header">
        <h3>BubbleGram</h3>
        {user ? (
          <Button
            color="secondary"
            variant="contained"
            onClick={() => auth.signOut()}
          >
            Logout
          </Button>
        ) : (
          <div className="app__loginButton">
            <Button
              color="primary"
              variant="contained"
              onClick={() => setOpenSignIn(true)}
            >
              Sign In
            </Button>
            <Button
              color="default"
              variant="contained"
              onClick={() => setOpen(true)}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
      <div className="app__upload">
        {user?.displayName ? (
          <Upload username={user.displayName} />
        ) : (
          <h5>Sign-In to Upload</h5>
        )}
      </div>
      <div className="app__posts">
        {/*Posts*/}
        {posts.map((posts) => (
          <Posts
            userName={posts.userName}
            caption={posts.caption}
            imageUrl={posts.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
