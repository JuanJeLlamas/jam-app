const { Schema, model } = require("mongoose");


const commentSchema = new Schema(
//     {
//         username: {
//             type: Schema.Types.ObjectId,
//             ref: User
//         },
//         comment: {
//             type: String
//         },
//         artistUser: {
//             type: Schema.Types.ObjectId,
//             ref: User
//         }
//     },
//     {
//         timestamps: true
//     }

// );

{
    comment: {
      type: String,
     
    }
}
)
  
const Comments = model("Comments", commentSchema);
module.exports = Comments;




