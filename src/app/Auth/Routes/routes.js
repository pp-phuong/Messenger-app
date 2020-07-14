import express from 'express';
import Controller from '../Controllers/AuthController';

import MiddleWare from '../Middleware/AuthMiddleware';

const router = express.Router();
const controller = new Controller();
const middleware = new MiddleWare();
router.get('/login', controller.viewLogin);
router.get('/register', middleware.isNotLogin, (req, res) => res.render('app/auth/register'));
router.get(
  '/register-email',
  middleware.isNotLogin,
  controller.callMethod('viewRegisterByEmail'),
);
router.get(
  '/register-phone-number',
  middleware.isNotLogin,
  controller.viewRegisterByPhoneNumber,
);
router.get('/verify-email', controller.viewVerifyEmail);
router.get('/verify-phone-number', controller.viewVerifyPhoneNumber);
router.get('/reset-password', (req, res) => res.render('app/view-reset-password'));

router.post('/auth/login-email', controller.callMethod('signInWithEmail'));
router.post('/signout', controller.signOut);


router.post('/auth/register-email', controller.callMethod('registerByEmail'));
router.post('/verify-email', controller.callMethod('verifyEmail'));


router.post('/register-phone-number', controller.registerByPhoneNumber);
router.post('/verify-phone-number', controller.verifyPhoneNumber);

export default router;
