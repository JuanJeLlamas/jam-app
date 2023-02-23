const { Schema, model } = require("mongoose");


const commentSchema = new Schema(
    {
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        comment: {
            type: String
        },
        artistUser: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
       
    },
    {
        timestamps: true
    }

)
  
const Comments = model("Comments", commentSchema);
module.exports = Comments;




