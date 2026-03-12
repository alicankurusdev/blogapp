"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT BLOG CATEGORY ROUTER                  */
/* -------------------------------------------------------------------------- */
const blogCategory= require('../controllers/blogCategoryController')
const router=require('express').Router()

/* -------------------------------------------------------------------------- */
router.route('/')
.get(blogCategory.list)
.post(blogCategory.create)

router.route('/:id')
.get(blogCategory.read)
.put(blogCategory.update)
.delete(blogCategory.delete)

/* -------------------------------------------------------------------------- */
module.exports= router