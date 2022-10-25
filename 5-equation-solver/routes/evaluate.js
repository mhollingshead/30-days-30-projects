const evaluateController = require("../controllers/evaluateController");
const router = require("express").Router();

router.get('/', evaluateController.evaluateExpression);

module.exports = router;