"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT DB CONNECTION                  */
/* -------------------------------------------------------------------------- */

const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/katamorfoz")
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB not Connected", err));
};
module.exports = dbConnection;
