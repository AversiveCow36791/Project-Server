import mongoose from 'mongoose';
const quizSchema = new mongoose.Schema({
    QuizType: {type: String, enum: ["Graded Quiz","Practice Quiz", "Graded Survey","Ungraded Survey"],default: 'Graded Quiz'},
    Points: Number,
    dueDate: String,
    numOfQuestions: Number,
    questions: [{id:String, question: String, options: [String], correctAnswer: String}],
    course: String,
    published: {type: Boolean, default: false},
    title: String,
    timeLimit: {type: Number, default: 20},
    MultipleAttempts: {type: String, enum:["No","Yes"], default: "No"},
    ShuffleAnswers: {type: String, enum:["No","Yes"], default: "Yes"},
    ShowCorrectAnswers: String,
    AccessCode: {type: String, default: ''},
    OneQuestionAtATime: {type: String, enum:["No","Yes"], default: "Yes"},
    webCamRequired: {type: String, enum:["No","Yes"], default: "No"},
    LockQuestionsAfterAnswering: {type: String, enum:["No","Yes"], default: "No"},
    availableDate: String,
    untilDate: String
},
{collection: 'quizzes'});

export default quizSchema;



