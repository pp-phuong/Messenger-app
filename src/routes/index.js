import express from 'express';
import authRouter from '../app/Auth/Routes/routes';

import Controller from '../app/Auth/Controllers/AuthController';
import MiddleWare from '../app/Auth/Middleware/AuthMiddleware';

const controller = new Controller();
const middleWare = new MiddleWare();
const router = express.Router();

router.use(authRouter);

router.get('/', (req, res) => { res.redirect('/conversations'); });
router.get('/signout', controller.signOut);
router.get('/conversations', middleWare.isLogin, controller.viewConversation);

export default router;
