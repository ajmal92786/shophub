const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: { type: string },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
