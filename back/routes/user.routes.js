const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");


// auth
router.post("/signup", userCtrl.signUp);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);

// user DB
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUser);


module.exports = router;
