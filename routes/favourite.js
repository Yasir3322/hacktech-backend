const express = require("express");
const Auth = require("../middleware/Auth");
const router = express.Router();

const {
  favourite,
  findFavourite,
  deleteFavourite,
} = require("../controller/favourite");
router.route("/favouriteproduct").post(Auth, favourite);
router.route("/:id").get(findFavourite).delete(deleteFavourite);
module.exports = router;
