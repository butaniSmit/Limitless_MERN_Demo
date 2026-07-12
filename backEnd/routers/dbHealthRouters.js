const express = require("express");
const dbHealthController = require("../controllers/dbHealthController");

const router = express.Router();

router.get("/", dbHealthController.checkDbHealth);

module.exports = router;
