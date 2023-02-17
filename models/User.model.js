const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type: String,
      enum:["particular", "artista"],
    },
    genre: [
      {
        type: String,
        enum: ["salsa", "rock", "pop", "dj", "flamenco", "mariachi"],
      },
    ],
    description: {
      type: String,
    },
    songs: [
      {
        type: String,
      },
    ],
    imageShow: [
      {
        type: String,
      },
    ],
    videoShow: [
      {
        type: String,
      },
    ],
    contact: {
      type: String,
    },
    imageProfile: {
      type: String,
    },

    // favourite: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   }
    // ]     ESTO PARA EL BONUS
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
