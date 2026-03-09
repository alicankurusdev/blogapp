"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT BLOG CATEGORY MODEL                  */
/* -------------------------------------------------------------------------- */

const mongoose = require("mongoose");

//*BlogCategory Schema
const blogCategorySchema = new mongoose.Schema(
  {
    name:{
        type:String,
        trim:true,
        required:[true,"Name field is required"]
    }
  },
  { collection: "blogCategories" },
);

const BlogCategory = mongoose.model('BlogCategory',blogCategorySchema)

module.exports={
BlogCategory
}