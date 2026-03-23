"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT BLOGPOST CONTROLLER                  */
/* -------------------------------------------------------------------------- */
const { BlogPost } = require("../models/blogPostModel");
const mongoose = require("mongoose");
module.exports = {
  list: async (req, res) => {
    console.log("list worked");
    const result = await BlogPost.find();
    res.status(200).send({
      error: false,
      result,
    });
  },
  create: async (req, res) => {

    if (!req.user) {
      throw new Error("first you have to login ");
      
    } 

    req.body.userId = req.user._id
    const result = await BlogPost.create(req.body);
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
    const result = await BlogPost.findById(req.params.id);
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

    const result = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
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

    const result = await BlogPost.deleteOne({ _id: req.params.id }, req.body);
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.errorStatusCode = 404;
      throw new Error("Data is not found and not deleted");
    }
  },
};
