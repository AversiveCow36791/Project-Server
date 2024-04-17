import mongoose from 'mongoose';
import schema from './schema';
const model = mongoose.model('QuizModel', schema);
export default model;