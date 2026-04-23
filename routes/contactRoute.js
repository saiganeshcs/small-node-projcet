const express = require('express')
const router = express.Router()
const {getContacts,createContacts,updateContact,deleteContact,getContact} = require('../controllers/contactController')
const validateTokenHandler = require('../middleware/validateTokenHandler')

router.use(validateTokenHandler);
router.route("/").get(getContacts).post(createContacts)
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

module.exports = router