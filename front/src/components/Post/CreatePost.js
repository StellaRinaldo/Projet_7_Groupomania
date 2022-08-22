import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import { addPost, getPosts } from "../../actions/post.actions";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postImageUrl, setPostImageUrl] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postImageUrl) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) data.append("imageUrl", file);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const handleImageUrl = (e) => {
    setPostImageUrl(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setMessage("");
    setPostImageUrl("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData, message]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data"></div>

          <div className="post-form">
            <div id="form-field">
              <i className="fa-solid fa-circle-user user-profil userPost pic-client fa-2x"></i>

              <textarea
                name="message"
                className="message"
                placeholder="Ecrivez quelque chose"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
            {message || postImageUrl ? (
              <li className="post-container-preview">
                <div className="">
                  <div className="post-header">
                    <div className="post-left">
                      <i className="fa-solid fa-circle-user user-profil userPost pic-client fa-2x"></i>
                      <h3>{userData.pseudo}</h3>
                    </div>
                    <span className="time">{timestampParser(Date.now())}</span>
                  </div>
                  <p>{message}</p>
                  <img src={postImageUrl} className="post-pic" alt="" />
                </div>
              </li>
            ) : null}
            <div className="new-post-form">
              {!isEmpty(error.format) && <p>{error.format}</p>}
              {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
              <div className="post-btn">
                <div className="select-img">
                  <img src="./picture.png" className="pic-icon" alt="img" />
                  <input
                    type="file"
                    id="file-upload"
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => handleImageUrl(e)}
                  />
                </div>
                <button className="send-btn send-post" onClick={handlePost}>
                  Envoyer
                </button>
                {message || postImageUrl ? (
                  <button className="cancel-btn" onClick={cancelPost}>
                    Annuler
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
