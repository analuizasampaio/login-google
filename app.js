const PORT = 3000;
const path = require("path");
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const template = handlebars.create({});
const passport = require("passport");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const authRouter = require("./routes/auth");
const usePassport = require("./config/auth/passport");
const isAuthenticated = require("./middlewares/routes-guard");
const populateUser = require("./middlewares/logged-user");
const { connectDB } = require("./config/db/datasource");

connectDB();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Template engine
app.engine("handlebars", template.engine);
app.set("view engine", "handlebars");

// Session support for login
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "sessions.db", dir: "./databases" }),
  })
);

// Set up Passport authentication and session
usePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Populate locals to access data on templates
app.use(populateUser);

// Routes
app.use("/oauth2", authRouter);

app.get("/", (req, res) => {
  res.render("index");
});

// Use auth middleware to protect this route
app.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard");
});

app.listen(PORT, () => console.log(`⚡Running on http://localhost:${PORT}`));
