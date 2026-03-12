"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT DB CONNECTION                  */
/* -------------------------------------------------------------------------- */

const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env?.DB_URI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB not Connected", err));
};
module.exports = dbConnection;
