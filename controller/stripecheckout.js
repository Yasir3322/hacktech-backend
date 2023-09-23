const stripe = require("stripe")(
  "sk_test_51MrYHJEg2I5qxKjJ4EYXuaKNXoJiPBXutcgXzRuKkGVgITnDeDBTQU3f5VtaMnMo138GBPGjfc33aGFCXfenx2Kg0065g0Sp9S"
);

const stripecheckout = async (req, res) => {
  // console.log(req.body.paymentdata);
  // return;
  const itemsarr = req.body.paymentdata.map((item) => {
    return { price: item.priceid, quantity: item.quantity };
  });
  // console.log(itemsarr);
  // return;
  const price_id = req.body.price_id;
  // console.log(price_id);
  const product_id = req.body.product_id;
  // console.log(service_id);
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: itemsarr,
      mode: "payment",
      // metadata: {
      //   buyer_id: req.user.id,
      //   product_id: product_id,
      // },
      success_url: "http://127.0.0.1:5173/Successfull",
      cancel_url: "http://127.0.0.1:5173/paymentfailure",
    });
    res.send(session.url);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { stripecheckout };
