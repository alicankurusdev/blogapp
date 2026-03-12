"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT BLOG POST ROUTER                  */
/* -------------------------------------------------------------------------- */
const blogPosts= require('../controllers/blogPostController')
const router=require('express').Router()
router.route('/')
.get(blogPosts.list)
.post(blogPosts.create)

router.route('/:id')
.get(blogPosts.read)
.put(blogPosts.update)
.delete(blogPosts.delete)
module.exports= router