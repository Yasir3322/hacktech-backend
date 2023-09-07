const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectdb = require("./ConnectDb/connect");

// Routers
const userRouter = require("./routes/user");
const productRouter = require("./routes/Product");
const favouriteRouter = require("./routes/favourite");
const reviewRouter = require("./routes/review");
const cartRouter = require("./routes/cart");
const catagoryRouter = require("./routes/catagories");
const tokenloginRouter = require("./routes/tokenLogin");
const productreqRouter = require("./routes/productRequest");
const stripecheckoutRouter = require("./routes/stripecheckout");

const app = express();

app.use(cors({ origin: "*" }));
const port = 8000;

app.use(express.json());
app.use("/api/v1", express.static("./upload/images"));
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/favourite", favouriteRouter);
app.use("/api/review", reviewRouter);
app.use("/api/cart", cartRouter);
app.use("/api/catagory", catagoryRouter);
app.use("/api/verifytoken", tokenloginRouter);
app.use("/api/product", productreqRouter);
app.use("/api/stripe", stripecheckoutRouter);

app.listen(port, () => {
  connectdb();
  console.log(`app is listening on port ${port}`);
});
