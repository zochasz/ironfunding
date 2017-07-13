const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  imgurl: { type: String, default: DEFAULT_IMG_URL },
  description: String
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
