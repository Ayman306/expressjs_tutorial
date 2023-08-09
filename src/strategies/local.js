const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../database/schema/user");
const { comparePassword } = require("../utils/helper");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  console.log(id);
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    console.log("Deserialising");
    console.log(user);
    done(null, user);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      console.log(email);
      console.log(password);
      try {
        if (!email || !password) {
          done(new Error(res.status(400).send("Missing creds")), null);
          // throw new Error(res.status(400).send("Missing creds"));
        }
        const userDB = await User.findOne({ email });
        if (!userDB) {
          done("Invalid creds", null);
          // throw new Error(res.status(401).send("Invalid creds"));
        }
        const isMatch = comparePassword(password, userDB.password);
        if (!isMatch) {
          done(null, null);
          console.log("Invalid cred");
        } else {
          console.log("Authentication successful");
          done(null, userDB);
        }
      } catch (err) {
        console.log(err);
        done(err, null);
      }
    }
  )
);
