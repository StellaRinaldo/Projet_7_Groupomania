const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
//const userController = require("../controllers/user.controller");
//const uploadController = require('../controllers/upload.controller');
//const multer = require("multer");
//const upload = multer();

// auth
router.post("/signup", userCtrl.signUp);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);

// user DB
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUser);
//router.put("/:id", userController.updateUser);
//router.delete("/:id", userController.deleteUser);
//router.patch("/follow/:id", userController.follow);
//router.patch("/unfollow/:id", userController.unfollow);

// upload
//router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
