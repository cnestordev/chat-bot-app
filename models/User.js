const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "something went wrong!"],
  },
  colorScheme: String,
  chatlogs: [
    {
      user: {
        type: String,
        required: [true, "something went wrong!"],
      },
      message: {
        type: String,
        required: [true, "something went wrong!"],
      },
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
