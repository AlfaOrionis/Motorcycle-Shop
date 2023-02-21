const express = require("express");
const app = express();
const xss = require("xss-clean");
const mongoSanitaze = require("express-mongo-sanitize");
const routes = require("./routes");
const mongoose = require("mongoose");
const passport = require("passport");
const { jwtStrategy } = require("./middlewares/passport");

const { handleError, convertToApiError } = require("./middlewares/apiError");

const uri = `mongodb+srv://${process.env.ADMIN}:${process.env.ADMIN_PASS}@${process.env.CLUSTER}retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

//sanitaze for safety
app.use(xss());
app.use(mongoSanitaze());

// passport
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/api", routes);

app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.use(express.static("client/build"));
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`server is running on ${port}`));
