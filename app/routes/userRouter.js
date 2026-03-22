"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT BLOG USER ROUTER                  */
/* -------------------------------------------------------------------------- */
const users = require('../controllers/userController')
const router=require('express').Router()


/* -------------------------------------------------------------------------- */
//URL:/users->

router.route('/')
.get(users.list)
.post(users.create)

router.route('/:id')
.get(users.read)
.put(users.update)
.delete(users.delete)

router.post('/login', users.login)
router.all('/logout', users.logout)

module.exports= router