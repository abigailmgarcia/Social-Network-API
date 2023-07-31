const { Schema, model, mongo, default: mongoose } = require("mongoose");

//schema for user model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        },
        thoughts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: { virtuals: true },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//init
const User = model('User', userSchema);
module.exports = User;