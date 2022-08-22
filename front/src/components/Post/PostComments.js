import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import { timestampParser } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";

const CardComments = ({ post }) => {
  const [text, setText] = useState("");
  //const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  };

  return (
    <div className="all-comments">
      {post.comments.map((comment) => {
        return (
          <>
            <div
              className="comment-container"
              key={comment._id}
            >
              <div className="comment-icon">
                {userData._id === comment.commenterId && (
                  <i className="fa-solid fa-circle-user user-profil userPost pic-client fa-2x"></i>
                )}
                {userData._id !== comment.commenterId && (
                  <i className="fa-solid fa-circle-user user-profil userPost pic-other fa-2x"></i>
                )}
              </div>
              <div className="comment-bloc">
                <div className="right-part-comment">
                  <h4 className="comment-pseudo">{comment.commenterPseudo}</h4>
                  <p className="comment-text">{comment.text}</p>
                </div>
                <div id="timeAndEdit">
                  <EditDeleteComment comment={comment} postId={post._id} />
                  <span className="time">
                    {timestampParser(comment.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </>
        );
      })}
      {userData._id && (
        <div className="comment-form-container">
          <i className="fa-solid fa-circle-user user-profil pic-client fa-2x"></i>

          <form onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              name="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Laisser un commentaire"
            />
            <br />
            <input type="submit" value="Envoyer" className="send-btn" />
          </form>
        </div>
      )}
    </div>
  );
};

export default CardComments;
