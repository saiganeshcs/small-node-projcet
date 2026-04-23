const express = require('express')
const router = express.Router()
const {getContects,createContect,getContect,updateContect,deleteContect} = require('../controllers/contactController')
const validateTokenHandler = require('../middleware/validateTokenHandler')

router.use(validateTokenHandler);
router.route("/").get(getContects).post(createContect)
router.route("/:id").get(getContect).put(updateContect).delete(deleteContect)

module.exports = router