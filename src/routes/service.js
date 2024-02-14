const express = require('express');
const router = express.Router();
const {auth,isConsultant} = require("../middlewares/auth")

const {createService} = require("../controllers/Service")

router.post("/createService" ,auth,isConsultant,createService,)

module.exports = router;