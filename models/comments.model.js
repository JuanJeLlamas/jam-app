const { Schema, model } = require("mongoose");


const commentSchema = new Schema(
    {
        name: String,
        comment: String,
        imageProfile: String


    },
    {
        timestamps: true,
    }
);

const Comments = model("Comments", commentSchema);

module.exports = Comments;
