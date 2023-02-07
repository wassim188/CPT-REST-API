const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:true,
    },
    phone: Number,
    age: Number,
},{timestamps:true}
);


module.exports = Users = mongoose.model("user", userSchema);