import express from 'express';
import authRouter from '../app/Auth/Routes/routes';
import Controller from '../app/Auth/Controllers/AuthController';
import MiddleWare from '../app/Auth/Middleware/AuthMiddleware';

const controller = new Controller();
const middleWare = new MiddleWare();
const router = express.Router();

router.use(authRouter);

router.get('/', middleWare.isLogin);

router.get('/conversations', controller.view);

export default router;
