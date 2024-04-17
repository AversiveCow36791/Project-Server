import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import UserRoutes from './Kanbas/users/routes.js';
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import cors from 'cors';
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentRoutes from './Kanbas/assignments/routes.js';
import QuizRoutes from './Kanbas/quizzes/routes.js';
import session from 'express-session';

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/kanbas';
const DB_NAME = process.env.DB_NAME;
mongoose.connect(CONNECTION_STRING, {dbName: DB_NAME});

const app = express();
app.use(cors(
    {
        credentials: true,
        origin: process.env.FRONTEND_URL,    }
));
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
    }
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
Hello(app);
QuizRoutes(app);
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000)