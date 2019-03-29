const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String },
  description: { type: String },
  date: { type: Date },
  timeStart: { type: String },
  timeEnd: { type: String },
  location: String,
  club: { type: Schema.Types.ObjectId, ref: "Club" },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }]
}, {
  timestamps: true,
});

module.exports = mongoose.model("Events", EventSchema);