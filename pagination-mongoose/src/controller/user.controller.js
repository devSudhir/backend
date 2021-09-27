const express = require("express");
const User = require("../models/user.model");
const transporter = require("../config/mail");
const router = express.Router();

router.get("", async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;

  const offset = (page - 1) * limit;
  const query = { age: { $gt: 40 } };

  const users = await User.find(query)
    .sort({ last_name: 1 })
    .skip(offset)
    .limit(limit)
    .lean()
    .exec();

  await transporter.sendMail({
    from: '"Fred Foo2 👻" <foo2@example.com>', // sender address
    to: "bar2@example.com, baz2@example.com", // list of receivers
    subject: "Hello2 ✔", // Subject line
    text: "Hello Sudhir2!", // plain text body
    html: "<b>Hello Sudhir1!</b>", // html body
    attachments: [
      {
        filename: "demo2.txt",
        content: "hello world2!",
      },
    ],
  });

  const totalDocuments = await User.find(query).countDocuments();

  const totalPages = Math.ceil(totalDocuments / limit);
  return res.status(200).json({ users, totalPages });
});

module.exports = router;
