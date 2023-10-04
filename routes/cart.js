const express = require("express");
const Auth = require("../middleware/Auth");
const router = express.Router();
const {
  createCart,
  getUserCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = require("../controller/cart");

router.route("/createcart").post(Auth, createCart);
router.route("/getusercartitems").get(Auth, getUserCart);
router.route("/removefromcart/:id").delete(removeFromCart);
router.route("/increasequantity/:id").patch(increaseQuantity);
router.route("/decreasequantity/:id").patch(decreaseQuantity);
module.exports = router;
