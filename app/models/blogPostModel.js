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
       },
    ],
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },

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
    published:{
      type:Boolean,
      default:false
    }
    
  },
  { collection: "blogPosts", timestamps: true },
);

module.exports = mongoose.model("BlogPost", blogPostSchema);
