const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new Schema({
  type: { type: String, default: 'member' },
  requested: { type: Boolean },
  accepted: { type: Boolean },
  leaderClub: [{type: Schema.Types.ObjectId, ref: "Club"}],
  clubs: [{ type: Schema.Types.ObjectId, ref: "Club" }],
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  username: { type: String, required: true },
  email: {
    type: String,
    required: [true, 'Email Required'],
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} not a valid email`
    }
  },
  number: {
    type: String,
    trim: true,
    required: false
  },
  password: {
    type: String,
    required: [true, 'Password Required'],
    minlength: [3, 'Password must be longer than 3 characters.'],
  }
}, {
  timestamps: true,
});

// const User = mongoose.model("User", UserSchema);
UserSchema.pre("save", function(next) {

  // ENCRYPT PASSWORD
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    }); //ends bcrypt.hash()

  }); //ends bcrypt.genSalt()

}); //end UserSchema.pre()
  
UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);