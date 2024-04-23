import questionModel from "./model.js";

export const findAllQuestions = () => questionModel.find();

export const findQuestionsByQid = (qid) => questionModel.find({ quiz: qid });
export const findQuestionById = (id) => questionModel.findOne({ _id: id });
export const createQuestion = (qid, questionData) => {
    const questionToCreate = {  ...questionData, quiz: qid };
    return questionModel.create(questionToCreate);
};
export const updateQuestion = (id, question) =>
    questionModel.updateOne({ _id: id }, { $set: question });
export const deleteQuestion = (id) => questionModel.deleteOne({ _id: id });