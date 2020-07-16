import firebase from '../../../config/firebase';
import BaseController from '../../../infrastructure/Controllers/BaseController';
import Service from '../Services/AuthService';

class AuthController extends BaseController {
  constructor() {
    super();
    this.service = Service.getService();
  }

  viewRegisterByEmail(req, res) {
    return res.render('app/auth/register-email');
  }

  viewLogin(req, res) {
    return res.render('app/login');
  }

  viewConversation(req, res) {
    return res.render('app/conversation/index');
  }

  viewRegisterByPhoneNumber(req, res) {
    return res.render('app/auth/register-phone-number');
  }

  viewVerifyPhoneNumber(req, res) {
    return res.render('app/auth/verified-phone-number');
  }

  viewVerifyEmail(req, res) {
    return res.render('app/auth/register-verify');
  }

  async registerByEmail(req, res) {
    const { email, pwd } = req.body;
    this.service.registerByEmail(email, pwd);
    return res.json({ message: email });
  }

  async registerByPhoneNumber(req, res, error) {
    const {
 phoneNumber, password, firstName, lastName,
} = req.body;
    try {
      await this.service.registerByPhoneNumber(
        phoneNumber,
        password,
        firstName,
        lastName,
      );
    } catch (e) {
      res.json({
        message: error.message,
      });
    }
    return res.json({
      message: error.message,
    });
  }

  async signInWithEmail(req, res, error) {
    const { email, password } = req.body;
    try {
      await this.service.signInWithEmail(email, password);
    } catch (e) {
      res.json({
        message: error.message,
      });
    }
    return res.json({
      message: error.message,
    });
  }

  async signInWithPhoneNumber(req, res, error) {
    const { phoneNumber, pwd } = req.body;
    await this.service.signInWithPhoneNumber(phoneNumber, pwd);
    return res.json({ message: error.message });
  }

  signOut(req, res) {
    try {
      firebase.auth().signOut();
      res.redirect('/login');
    } catch (error) {
      res.json(error.message);
    }
  }
}

export default AuthController;
