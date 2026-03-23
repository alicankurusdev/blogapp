"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT Authentication                   */
/* -------------------------------------------------------------------------- */
 const User = require('../models/userModel')
module.exports = async ( req, res, next) => {

    req.user =null;
const {_id,email}= req.session

    if (req.session?._id) {
        const user = await User.findOne({_id,email})

        user ? req.user= user : req.session =null
    }
  next()
};
