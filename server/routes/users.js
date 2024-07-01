const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

//router.get("/", usersController.getAllUsers);

//localhost:3000/cats/5sa4d949qw86d5sa4d6sa
//req.params.id

//router.get("/:id", usersController.getUserById);

//router.delete("/:id", usersController.deleteUser);

//router.put("/:id", usersController.updateUser);

router.post("/register", usersController.createUser);

router.post("/login", usersController.signInUser);

router.post("/userdata", usersController.getUserData);

module.exports = router;
