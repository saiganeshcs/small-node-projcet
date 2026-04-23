const express = require('express')
const userController = require('../controllers/userController')
const validateTokenHandler = require('../middleware/validateTokenHandler')

const router = express.Router();

router.post("/register",userController.registerUser)

router.post("/login",userController.loginUser)


router.get("/current",validateTokenHandler, userController.getCurrentUser)

module.exports = router;