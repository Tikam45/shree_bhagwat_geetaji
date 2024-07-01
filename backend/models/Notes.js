const mongoose = require("mongoose");

const slokSchema = new mongoose.Schema({
  slok: {
    type: Number,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
});

const chapterSchema = new mongoose.Schema({
  chapter: {
    type: Number,
    required: true,
    trim: true,
  },
  sloks: [slokSchema],
});

const notesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  notes: [chapterSchema],
});

module.exports = mongoose.model("Notes", notesSchema);
