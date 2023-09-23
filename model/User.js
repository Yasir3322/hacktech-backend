const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "must provide fullname"],
  },
  email: {
    type: String,
    required: [true, "must provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide valid email",
    ],
    unique: true,
  },
  type: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "must provide password"],
  },
  image: {
    type: String,
    default: null,
  },
  privacypolicy: {
    type: Boolean,
  },
  socketid: {
    type: String,
    required: true,
  },
  userreview: {
    type: Number,
    default: 0,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createjwt = function () {
  return jwt.sign(
    {
      id: this._id,
      fullName: this.fullName,
      email: this.email,
      imageurl: this.image,
    },
    "hacktech"
  );
};

UserSchema.methods.comparePassword = async function (enterPassword) {
  const isMatch = bcrypt.compare(enterPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("user", UserSchema);
