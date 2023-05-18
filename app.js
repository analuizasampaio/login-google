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

app.use(express.static('public'));

const stripe = require('stripe')('sk_test_51N9BvXDmpzzBxcb8ybRndRdZsrRRu4uPvL1HKgtbwgj2RH5FfBK889gZoGUDZ2yfjriMyV8Uzs1AV58sRJkEX8cR00746zXGbE');


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
  res.render("index")
});

//STRIPE

app.get("/payment", (req, res) => {
  res.render("payment")
});

const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1N9EsaDmpzzBxcb8n7HBIHbt',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});


app.listen(PORT, () => console.log(`⚡Running on http://localhost:${PORT}`));
