import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import LikeButton from "./LikeButton";
import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeletePost";
import CardComments from "./PostComments";

const Post = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="post-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="post">
            <div className="post-header">
              <div className="post-left">
                {userData._id === post.posterId && (
                  <i className="fa-solid fa-circle-user user-profil userPost pic-client fa-2x"></i>
                )}
                {userData._id !== post.posterId && (
                  <i className="fa-solid fa-circle-user user-profil userPost pic-other fa-2x"></i>
                )}

                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.pseudo;
                        else return null;
                      })
                      .join("")}
                </h3>
              </div>
              <span className="time">{dateParser(post.createdAt)}</span>
            </div>
            <div id="edit-post">
              {isUpdated === false && <p>{post.message}</p>}
              {(userData._id === post.posterId || userData.role) && (
                <div className="button-container">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <i className="fa-solid fa-pen-to-square editPost"></i>
                  </div>
                  <DeleteCard id={post._id}/>
                </div>
              )}
               
            </div>
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="send-btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
            {post.imageUrl ? (
              <img src={post.imageUrl} alt="post-pic" className="post-pic" />
            ): null}

            <div className="post-footer post-header">
              <div className="comment-section">
                <p
                  id="comment-title"
                  onClick={() => setShowComments(!showComments)}
                >
                  Commentaires
                </p>
                <span className="number">{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
            </div>
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Post;
