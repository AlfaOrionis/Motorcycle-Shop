const mongoose = require("mongoose");
const { Schema } = mongoose;

const newsLetterSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
  },
});

const NewsLetter = mongoose.model("NewsLetter", newsLetterSchema);

module.exports = NewsLetter;
