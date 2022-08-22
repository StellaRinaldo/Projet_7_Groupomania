import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.actions";
import { UidContext } from "../AppContext";

const EditDeleteComment = ({ comment, postId }) => {
  const userData = useSelector((state) => state.userReducer);
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => dispatch(deleteComment(postId, comment._id));

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId || userData.role) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId, userData.role]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <div className="edit-section" onClick={() => setEdit(!edit)}>
          <i className="fa-solid fa-pen-to-square pen"></i>
        </div>
      )}
      {isAuthor && edit && (
        <form onSubmit={handleEdit} className="edit-comment-form">
          <div id="edit-option">
          <label
            className="edit-section"
            htmlFor="text"
            onClick={() => setEdit(!edit)}
          >
            <i className="fa-solid fa-pen-to-square pen"></i>
            <p className="edit cancel">Annuler</p>
          </label>
          <label
            htmlFor="text"
            onClick={() => {
              if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                handleDelete();
              }
            }}
          >
            <i className="fa-solid fa-trash delete"></i>
          </label>
          </div>
          
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />

          
            <input className="send-btn" type="submit" value="Valider modification" />
        
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
