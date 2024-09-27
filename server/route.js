const express=require("express");
const router=express.Router();
const cors=require("cors");
const { registerUser, loginUser, getProfile, logoutUser, updateUser, deleteUser } = require("./controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.post("/logout", logoutUser);
router.put("/update", updateUser);
router.delete("/delete",deleteUser);

module.exports=router;