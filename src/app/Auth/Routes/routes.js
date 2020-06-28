import express from 'express';
import Controller from '../Controllers/AuthController';

import MiddleWare from '../Middleware/AuthMiddleware';

const router = express.Router();
const controller = new Controller();
const middleware = new MiddleWare();
router.get('/login', middleware.isNotLogin, controller.viewLogin);

router.post('/login', controller.callMethod('signInWithEmail'));
router.route('/login-phone-number')
  .get(controller.viewRegisterByPhoneNumber)
  .post(controller.signInWithPhoneNumber);
router.post('/signout', controller.signOut);
router.get('/register', middleware.isNotLogin, (req, res) => res.render('app/auth/register'));

router.get(
  '/register-email',
  middleware.isNotLogin,
  controller.callMethod('viewRegisterByEmail'),
);
router.post('/register-email', controller.callMethod('registerByEmail'));

router.get(
  '/register-phone-number',
  middleware.isNotLogin,
  controller.viewRegisterByPhoneNumber,
);
router.post('/register-phone-number', controller.registerByPhoneNumber);
router.post('/verify-phone-number', controller.verifyPhoneNumber);
router.get('/reset-password', (req, res) => res.render('app/view-reset-password'));
export default router;
