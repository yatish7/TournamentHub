const express = require("express");
const session = require("express-session");
const path = require("path");
const hbs = require("hbs");
const { Collection1 } = require("./mongodb");
const app = express();
const viewPath = path.join(__dirname, "/views");
app.set("views", viewPath);

app.use(express.json());
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
)
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/login",(req,res)=>{
  res.render("login")
})

app.post("/signup", async (req, res) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    zipcode: req.body.zipcode,
    locality: req.body.locality,
    city: req.body.city || [],
    level: req.body.level || [],
  };
  await Collection1.insertMany([data]);

  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  try {
    const verify = await Collection1.findOne({ username: req.body.username });
    if (verify && verify.password === req.body.password) {
      req.session.username = verify.username;
      res.render("home");
    } else {
      res.render("login", { errorMessage: "Wrong Password" });
    }
  } catch (error) {
    console.log(error);
    res.render("login", { errorMessage: "Invalid Credentials" });
  }
});
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});