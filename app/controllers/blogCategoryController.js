"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT BLOG CATEGORY CONTROLLER                  */
/* -------------------------------------------------------------------------- */
const  BlogCategory  = require("../models/blogCategoryModel");

module.exports = {
  list: async (req, res) => {
    console.log("list worked");
    const result = await BlogCategory.find();
    res.status(200).send({
      error: false,
      result,
    });
  },
  create: async (req, res) => {
    const result = await BlogCategory.create(req.body);
    console.log("cre worked");

    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
    console.log("re worked");

    const result = await BlogCategory.findById(req.params.id);
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    console.log("up worked");

    const result = await BlogCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }, // makes result updated data
    );
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

    const result = await BlogCategory.deleteOne(
      { _id: req.params.id },
      req.body,
    );
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.errorStatusCode = 404;
      throw new Error("Data is not found and not deleted");
       
    }
  },
};
