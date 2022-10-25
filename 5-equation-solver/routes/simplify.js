const simplifyController = require("../controllers/simplifyController");
const router = require("express").Router();

router.get('/', simplifyController.simplifyExpression);

module.exports = router;