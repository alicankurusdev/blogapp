"use strict"

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT WITH MONGOOSE                   */
/* -------------------------------------------------------------------------- */

const express = require('express')
const app =express()


require('dotenv').config()
const PORT =  process.env.PORT || 8000
const HOST =  process.env.HOST || "http://127.0.0.1"

/* ------------------------------- middlewares & config ------------------------------ */


/* -------------------------- accept and parse data ------------------------- */
app.use(express.json())

/* ------------------------------ db connection ----------------------------- */
require('./app/dbconnection')()
/* --------------------------------- routes --------------------------------- */
app.use(require('./app/routes/blogCategoryRouter'))

/* ------------------------------ error Handler ----------------------------- */
app.use(require('./app/middlewares/errorHandler')) 

app.listen(PORT,()=>console.log(`Api is running on http://${HOST}:${PORT}`) )