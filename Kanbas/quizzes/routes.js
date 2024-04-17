import * as dao from './dao';

function QuizRoutes(app) {
    const createQuiz = async (req, res) => {
        const { cid } = req.params;
        const newQuiz = await dao.createQuiz({ ...req.body, course: cid });
        res.json(newQuiz);
    };

    app.post('/api/courses/:cid/quizzes', createQuiz);


    const deleteQuiz = async (req, res) => {
        const status = await dao.deleteQuiz(req.params.qid);
        res.json(status);
    };

    app.delete('/api/quizzes/:qid', deleteQuiz);

    const findAllQuizzes = async (req, res) => {
        const quizzes = await dao.findAllQuizzes();
        res.json(quizzes);
    };

    app.get('/api/quizzes', findAllQuizzes);

    const findQuizById = async (req, res) => {
        const quiz = await dao.findQuizById(req.params.qid);
        res.json(quiz);
    };

    app.get('/api/quizzes/:qid', findQuizById);

    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.updateQuiz(qid, req.body);
        const currentQuiz = await dao.findQuizById(qid);
        res.json(currentQuiz);
    };

    app.put('/api/quizzes/:qid', updateQuiz);
}