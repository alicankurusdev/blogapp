"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT BLOG USER MODEL                  */
/* -------------------------------------------------------------------------- */

const mongoose = require("mongoose");
const passwordEncrypte = require('../utils/passwordEncrypt')
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
      required: true,
      set: passwordEncrypte
    },
    userName: {
      type: String,
      trim: true,
      //unique: true,
      required: [true, "This username is Already in use"],
    },
    firstName: String,
    lastName: String,
  },
  { collection: "users", timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
