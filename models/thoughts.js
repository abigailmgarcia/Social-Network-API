const { Schema, model, mongo, default: mongoose } = require("mongoose");

// thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength:[1, "Thought text must be at least 1 charcter long"],
            maxlength: [280, "Thought text",]
        }
    }
)