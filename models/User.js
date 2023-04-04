const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { BOT } = require("../config/constants");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "something went wrong!"],
  },
  colorScheme: String,
  chatlog: [
    {
      username: {
        type: String,
        required: [true, "something went wrong!"],
      },
      message: {
        type: String,
        required: [true, "something went wrong!"],
      },
      isMedia: {
        type: Boolean,
        required: [true, "something went wrong!"],
      },
    },
  ],
});

UserSchema.pre("save", function (next) {
  if (this.isNew) {
    this.chatlog.push({
      username: BOT,
      message: "Hello there! Feel free to ask me anything!",
    });
  }
  next();
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
