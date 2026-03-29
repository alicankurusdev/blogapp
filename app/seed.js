"use strict";

/* -------------------------------------------------------------------------- */
/*                    EXPRESS JS-BLOG PROJECT SEED DATA                   */
/* -------------------------------------------------------------------------- */

const User = require("./models/userModel");
const BlogPost = require("./models/blogPostModel");
const BlogCategory = require("./models/blogCategoryModel");

module.exports = async () => {
  //delete all records

  await User.deleteMany().then(() => console.log("All users are deleted"));
  await BlogCategory.deleteMany().then(() =>
    console.log("All blogcategories are deleted"),
  );
  await BlogPost.deleteMany().then(() =>
    console.log("All blogPost are deleted"),
  );

  //example user: cretesone user and return it back

  const user = await User.create({
    email: "test@test.com",
    password: "123456789",
    userName: "Test",
    firstName: "Test",
    lastName: "Test",
  });

  //example category:

  const blogCategory = await BlogCategory.create({
    name: "Test Category",
  });

  // example posts creator
  const posts = [];

  for (let key = 0; key < 200; key++) {
    posts.push({
      userId: user._id,
      blogCategory: blogCategory._id,
      title: `test ${key+1} title`,
      content: `test ${key+1} content`,
      published: key % 2 === 1,
    });
  }

  await BlogPost.insertMany(posts);
  console.log("*Syncronized");
};
/* -------------------------------------------------------------------------- */
