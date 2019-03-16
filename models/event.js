const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String },
  date: { type: Date },
  club: [{ type: Schema.Types.ObjectId, ref: "Club" }],
}, {
  timestamps: true,
});

module.exports = mongoose.model("Events", EventSchema);