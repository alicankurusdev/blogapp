"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT USER CONTROLLER                  */
/* -------------------------------------------------------------------------- */
const User = require("../models/userModel");
const mongoose = require("mongoose");
const passwordEncrypt = require("../utils/passwordEncrypt");
module.exports = {
  list: async (req, res) => {
    const result = await res.getModelList(User);
    res.status(200).send({
      error: false,
      details:await res.getModelListDetails(User),
      result,
    });
  },
  create: async (req, res) => {
    const { password } = req.body;
    if (!password || password.length < 8) {
      res.errorStatusCode = 400;
      throw new Error("The password must be more than 8 characters ");
    }

    const result = await User.create(req.body);
    console.log("cre worked");

    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
    console.log("re worked");
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).send({
        error: true,
        message: "Invalid ID format",
      });
    }
    const result = await User.findById(req.params.id);
    if (!result) {
      res.errorStatusCode = 400;
      throw new Error("Data is not found");
    }
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    console.log("up worked");

    const result = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      console.log("calsiti");
      res.errorStatusCode = 400;
      throw new Error("Data is not found");
    }
    res.status(200).send({
      error: false,
      result,
    });
  },
  delete: async (req, res) => {
    console.log("de worked");

    const result = await User.deleteOne({ _id: req.params.id }, req.body);
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.errorStatusCode = 404;
      throw new Error("Data is not found and not deleted");
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    if (email && password) {
      //email verification
      const user = await User.findOne({ email });

      const passCheck = passwordEncrypt(password) == user?.password;
      console.log(passCheck);
      if (user) {
        if (passCheck) {
          //SESSION
          req.session = {
            email: user.email,
            _id: user._id,
          };
          //COOKIE
          if (req.body?.rememberMe == true) {
            req.session.rememberMe = true;
            req.sessionOptions.maxAge = 1000 * 60 * 60 * 24;
          }
          res.status(200).send({
            error: false,
            message: "LOgin is Succesful",
          });
        } else {
          throw new Error("Wrong Password");
        }
      } else {
        throw new Error("Wrong Email or Password");
      }
    } else {
      throw new Error("you must enter both password and email");
    }
  },
  logout: async (req, res) => {
    req.session = null;

    res.status(200).send({
      error: false,
      message: "Log out is success",
    });
  },
};
