const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  title: { type: String },
  purpose: { type: String },
  accepted: { type: Boolean, default: false },
  leaders: [{ type: Schema.Types.ObjectId, ref: "User" }],
  events: [{ type: Schema.Types.ObjectId, ref: "Event", default: [""]}],
  members: [{ type: Schema.Types.ObjectId, ref: "User", default: [""]}]
}, {
  timestamps: true,
});

module.exports = mongoose.model("Club", ClubSchema);