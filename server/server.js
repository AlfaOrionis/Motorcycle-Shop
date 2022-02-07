const express = require("express");
const app = express();
const xss = require("xss-clean");
const mongoSanitaze = require("express-mongo-sanitize");
const routes = require("./routes");
const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.ADMIN}:${process.env.ADMIN_PASS}@${process.env.CLUSTER}retryWrites=true&w=majority`;

mongoose.connect(uri);

app.use(express.json());

//sanitaze for safety
app.use(xss());
app.use(mongoSanitaze());

app.use("/api", routes);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`server is running on ${port}`));
