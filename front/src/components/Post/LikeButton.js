import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";
import {
  likePost,
  unlikePost,
  dislikePost,
  undislikePost,
} from "../../actions/post.actions";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };

  const dislike = () => {
    dispatch(dislikePost(post._id, uid));
    setLiked(true);
  };

  const undislike = () => {
    dispatch(undislikePost(post._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);

    if (post.dislikers.includes(uid)) setDisLiked(true);
    else setDisLiked(false);
  }, [uid, post.likers, liked, post.dislikers, disliked]);

  return (
    <div className="like-container">

      {uid && liked === false && (
        <>
          <div onClick={like} className="like">
            <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
            <span className="number">{post.likers.length}</span>
          </div>
        </>
      )}
      {uid && liked && disliked === false && (
        <>
          <div onClick={unlike}>
            <i className="fa fa-thumbs-up likeActive" aria-hidden="true"></i>
            <span className="number">{post.likers.length}</span>
          </div>
        </>
      )}
      {uid && disliked === false && (
        <div onClick={dislike}>
          <i className="fa fa-thumbs-o-down dislike" aria-hidden="true"></i>
          <span className="number">{post.dislikers.length}</span>
        </div>
      )}
      {uid && disliked && liked === false && (
        <div onClick={undislike}>
          <i className="fa fa-thumbs-down dislike dislikeActive" aria-hidden="true"></i>
          <span className="number">{post.dislikers.length}</span>
        </div>
      )}
    </div>
  );
};

export default LikeButton;
