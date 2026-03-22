"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT    passcrypt           */
/* -------------------------------------------------------------------------- */

const crypto = require("node:crypto");

module.exports = (password) => {
  const salt = process.env.PASS_SALT;
  const iterations = parseInt(process.env?.PASS_ITERATIONS);
  const keylen = parseInt(process.env?.PASS_KEYLEN);
  const digest = process.env.PASS_DIGEST;
  return crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString("hex");
};
