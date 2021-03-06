import React, { useState } from "react";
import { Button, Input } from "@material-ui/core";
import { storage, db } from "./firebase";
import firebase from "firebase";
import "./Upload.css";

function Upload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //Progress Function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        //Upload Complete
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              userName: username,
            });
            setProgress(0);
            setCaption("");
            setImage("null");
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <div className="file__progress">
        <div className="input__file">
          <input type="file" accept="image/*" onChange={handleChange} />
        </div>
        <div className="progress">
          <progress value={progress} max="100" />
        </div>
        <div className="input__caption">
          <input
            type="text"
            placeholder="caption"
            onChange={(event) => setCaption(event.target.value)}
            value={caption}
            className="caption"
          />
        </div>
      </div>
      <div className="button">
        <Button
          onClick={handleUpload}
          color="primary"
          variant="contained"
          type="submit"
        >
          upload
        </Button>
      </div>
    </div>
  );
}

export default Upload;
