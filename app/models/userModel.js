"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT BLOG USER MODEL                  */
/* -------------------------------------------------------------------------- */

const mongoose = require("mongoose");
const crypto = require("node:crypto");

const passwordEncrypte = (password) => {
  const salt = "65as4d4asd6as2d84d9asd46ver4b4b";
  const iterations = 10_000;
  const keylen = 50;
  const digest = "sha512";
  return crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString("hex");
};
//*User Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: [true, "This email is already in use"],
      // validate:[(email)=>{
      // },'please enter a valid email adress'],//=> if validate returns false it throws validation error
      match: [/.+@.+\..+/, "please enter a valid email adress"],
      required: true,
    },
    password: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      set: passwordEncrypte
    },
    userName: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "This username is Already in use"],
    },
    firstName: String,
    lastName: String,
  },
  { collection: "users", timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
