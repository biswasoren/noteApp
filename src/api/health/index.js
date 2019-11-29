const express = require('express');
const controller = require('./health.controller');
import cokkie from "js-cookie";

const router = express.Router();
        

router.get('/check', controller.send);
      
module.exports = router;