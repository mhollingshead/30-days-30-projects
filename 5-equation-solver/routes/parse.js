const parseController = require("../controllers/parseController");
const router = require("express").Router();

router.get('/', parseController.parseExpression);

module.exports = router;