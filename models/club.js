const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  title: { type: String },
  requested: { type: String },
  accepted: { type: String },
  leaders: [{ type: Schema.Types.ObjectId, ref: "User" }],
  events: [{ type: Schema.Types.ObjectId, ref: "Event", default: [""]}]
}, {
  timestamps: true,
});

module.exports = mongoose.model("Club", ClubSchema);