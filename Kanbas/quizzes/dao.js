import model from './model.js';
export const createQuiz = async (quiz) => {
    delete quiz._id;
    return model.create(quiz);
};
export const findAllQuizzes = () => model.find();
export const findQuizById = (quizId) => model.findById(quizId);
export const updateQuiz = (quizId, quiz) => model.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });
export const findAllQuizzesByCourse = (courseId) => model.find({ courseId });