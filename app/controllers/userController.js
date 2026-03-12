"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT USER CONTROLLER                  */
/* -------------------------------------------------------------------------- */
const  User  = require("../models/userModel");
const mongoose = require("mongoose");
module.exports = {
  list: async (req, res) => {
    console.log("list worked");
    const result = await User.find();
    res.status(200).send({
      error: false,
      result,
    });
  },
  create: async (req, res) => {

    const {password} = req.body
console.log(password)
      if (!password || password.length< 8) {
        res.errorStatusCode= 400
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
};
