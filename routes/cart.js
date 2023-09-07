const express = require("express");
const Auth = require("../middleware/Auth");
const router = express.Router();
const {
  createCart,
  getUserCart,
  removeFromCart,
} = require("../controller/cart");

router.route("/createcart").post(Auth, createCart);
router.route("/getusercartitems").get(Auth, getUserCart);
router.route("/removefromcart/:id").delete(removeFromCart);
module.exports = router;
