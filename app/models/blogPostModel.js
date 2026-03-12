"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT BLOG POST MODEL                  */
/* -------------------------------------------------------------------------- */

const mongoose = require("mongoose");

//*BlogPost Schema
const blogPostSchema = new mongoose.Schema(
  {
    blogCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogCategory",
        required: [true, "BlogCategory field is required"],
        unique:true // => makes one to one relationship one category only applicable to one blog
       },
    ],
    title: {
      type: String,
      trim: true,
      required: [true, "Title field is required"],
    },
    content: {
      type: String,
      trim: true,
      required: [true, "Content field is required"],
    },
  },
  { collection: "blogPosts", timestamps: true },
);

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = {
  BlogPost,
};
