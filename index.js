const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const http = require("http").Server(app);

const connectdb = require("./ConnectDb/connect");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

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
const chatuserRouter = require("./routes/chatusers");
const messageRouter = require("./routes/messages");
const notificationRouter = require("./routes/notification");

app.use(cors({ origin: "*" }));
const port = 8000;

app.use(express.json());
app.use("/api/v1", express.static("./upload/images"));
app.use("/api/product", productreqRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/favourite", favouriteRouter);
app.use("/api/review", reviewRouter);
app.use("/api/cart", cartRouter);
app.use("/api/catagory", catagoryRouter);
app.use("/api/verifytoken", tokenloginRouter);
app.use("/api/stripe", stripecheckoutRouter);
app.use("/api/users", chatuserRouter);
app.use("/api/message", messageRouter);
app.use("/api/notification", notificationRouter);

let users = [];

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} just connected`);

  socket.on("message", (data) => {
    console.log(data);
    const targetedUser = users.find((user) => user.userid === data.to);
    const sender = users.find((sender) => sender.userid === data.id);
    console.log({ targetedUser });
    if (targetedUser) {
      socketIO.to(targetedUser.socketId).emit("messageResponse", data);
    }
    console.log(sender);
    if (sender) {
      console.log("emitted message to sender");
      socketIO.to(sender.socketId).emit("messageResponse", data);
    }
    // socket.emit("messageResponse", data);
  });

  socket.on("newuser", (data) => {
    console.log(data);
    users.push(data);
    socketIO.emit("newUserResponse", users);
  });
});

console.log(users);

http.listen(port, () => {
  connectdb();
  console.log(`app is listening on port ${port}`);
});
