const express = require("express");
const router = express.Router();

const {
    signUp,
    loginUser
} = require("../controller/Auth");

router.post("/signUp",signUp);
router.post("/loginUser",loginUser);

module.exports = router;