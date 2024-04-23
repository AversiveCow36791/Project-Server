import mongoose from "mongoose";
import questionSchema from "./schema.js";
const questionModel = mongoose.model("question",questionSchema);
export default questionModel;