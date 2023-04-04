const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { BOT, DEFAULT_BOT_MESSAGE } = require("../config/constants");

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
      message: DEFAULT_BOT_MESSAGE,
      isMedia: false,
    });
  }
  next();
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
