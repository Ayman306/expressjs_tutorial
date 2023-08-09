const { Router } = require("express");
const passport = require("passport");
const router = Router();
const user = require("../database/schema/user");
const { hashPassword, comparePassword } = require("../utils/helper");

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) return res.status(400).send("cred req");
//   const userDB = await user.findOne({ email });
//   if (!userDB) return res.sendStatus(401);
//   const isMatch = comparePassword(password, userDB.password);
//   if (!isMatch) {
//     return res.send(401);
//   } else {
//     req.session.user = userDB;
//     console.log("authenticated");
//     res.send(200);
//   }
// });`

router.post("/login", passport.authenticate("local"), async (req, res) => {
  console.log("Logged in");
  res.send(200);
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  const userDB = await user.findOne({ email });
  if (userDB) {
    res.status(400).send({ msg: "User already exists" });
  } else {
    const password = hashPassword(req.body.password);
    const newUser = await user.create({ password, email });
    res.send(201);
  }
});
module.exports = router;
