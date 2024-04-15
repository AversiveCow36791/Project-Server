import mongoose from "mongoose";
const moduleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    course: { type: String, required: true },
    lessons: [{ _id: String, name:String, description: String}],
    },
    { collection: "modules"});

export default moduleSchema;
