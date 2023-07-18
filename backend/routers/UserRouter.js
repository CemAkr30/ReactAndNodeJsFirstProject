const express = require('express');
const router = express.Router();


const controller = require("../controllers/UserController");
const {authMiddleware} = require('../auth/AuthHandler');

router.get("/all",authMiddleware,controller.getUser);
router.post("/save",authMiddleware,controller.saveUser);
router.post("/update/:id",authMiddleware,controller.updateUser);
router.post("/login",controller.login);
router.post("/register",controller.register);

module.exports = router;

