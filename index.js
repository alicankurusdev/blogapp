"use strict"

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT WITH MONGOOSE                   */
/* -------------------------------------------------------------------------- */

const express = require('express')
const app =express()


require('dotenv').config()
const PORT =  process.env.PORT || 8000
const HOST =  process.env.HOST || "http://127.0.0.1"

/* -------------------------- accept and parse data ------------------------- */
app.use(express.json())

/* ------------------------------- middlewares & config ------------------------------ */
const session = require("cookie-session")
app.use(session({
    secret:process.env.PASS_SALT,
   // maxAge:1000*10
}))


/* ------------------------------ db connection ----------------------------- */
require('./app/dbconnection')()
/* --------------------------------- routes ------a--------------------------- */
app.all('/', (req,res)=>{
    res.send({
        message:"welcome to Blog API",
        session:req.session
    })
    req.session
})

app.use('/blogCategories',require('./app/routes/blogCategoryRouter'))
app.use('/blogPosts',require('./app/routes/blogPostRouter'))
app.use('/users',require('./app/routes/userRouter'))

/* ------------------------------ error Handler ----------------------------- */
app.use(require('./app/middlewares/errorHandler')) 

app.listen(PORT,()=>console.log(`Api is running on http://${HOST}:${PORT}`) )