const express = require("express");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require('connect-mongo')

require("./database/connect");
require("./strategies/local");

const app = express();
const PORT = 3001;
const memoryStore = new session.MemoryStore();

const listRoute = require("./routes/groceries.js");
const marketRoute = require("./routes/markets.js");
const authRoute = require("./routes/auth");

// middle ware acts as a middle man , which manipulates the data mainly used as an authencity and must be declared before the routers
app.use(express.json());

app.use(express.urlencoded());
app.use((req, res, next) => {
  console.log(memoryStore);
  console.log("Before handling req");
  next();
});

app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:"mongodb://localhost:27017/expressjs_tutorial"       
    }),
  })
);
// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoute);
app.use("/api/grocery", listRoute);
app.use("/api/market", marketRoute);
app.listen(PORT, () => console.log(`Running express on port ${PORT}`));
