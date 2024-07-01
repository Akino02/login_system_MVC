var express = require("express");
var router = express.Router();

const catsController = require("../controllers/cats");

router.get("/", catsController.getAllCats);

//localhost:3000/cats/5sa4d949qw86d5sa4d6sa
//req.params.id

router.get("/:id", catsController.getCatById);

router.delete("/:id", catsController.deleteCat);

router.put("/:id", catsController.updateCat);

router.post("/", catsController.createCat);

module.exports = router;
