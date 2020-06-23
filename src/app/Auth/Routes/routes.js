import express from 'express';
import Controller from '../Controllers/AuthController';

const router = express.Router();
const controller = new Controller();

router.get('/login', (req, res) => res.render('app/login'));

router.post('/login', controller.callMethod('signInWithEmail'));
router.route('/login-phone-number')
  .get((req, res) => res.render('app/login-phone-number'))
  .post(controller.signInWithPhoneNumber);

router.get('/register', (req, res) => res.render('app/auth/register'));

router.get('/register-email', controller.callMethod('viewRegisterByEmail'));
router.post('/register-email', controller.callMethod('registerByEmail'));

router.get('/register-phone-number', controller.viewRegisterByPhoneNumber);
router.post('/register-phone-number', controller.registerByPhoneNumber);

router.get('/reset-password', (req, res) => res.render('app/view-reset-password'));
export default router;
