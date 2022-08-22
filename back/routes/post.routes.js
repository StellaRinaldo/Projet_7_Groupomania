const router = require('express').Router();
const postCtrl = require('../controllers/postCtrl');
const multerConfig = require("../middleware/multer-config");


router.get('/', postCtrl.getAllPosts);
router.post('/', multerConfig, postCtrl.createPost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);

//LIKE-POST

router.patch('/like-post/:id', postCtrl.likePost);
router.patch('/unlike-post/:id', postCtrl.unlikePost);
router.patch('/dislike-post/:id', postCtrl.dislikePost);
router.patch('/undislike-post/:id', postCtrl.undislikePost);

// COMMENTS
router.patch('/comment-post/:id', postCtrl.commentPost);
router.patch('/edit-comment-post/:id', postCtrl.editCommentPost);
router.patch('/delete-comment-post/:id', postCtrl.deleteCommentPost);

module.exports = router;