import firebase from '../../../config/firebase';
import BaseController from '../../../infrastructure/Controllers/BaseController';
import Service from '../Services/AuthService';

class AuthController extends BaseController {
  constructor() {
    super();
    this.service = Service.getService();
  }

  viewRegisterByEmail(req, res) {
    return res.render('app/auth/register-email', { msg: req.flash('msg') });
  }

  viewLogin(req, res) {
    return res.render('app/login', { msg: req.flash('msg') });
  }

  viewConversation(req, res) {
    return res.render('app/conversation/index');
  }

  viewRegisterByPhoneNumber(req, res) {
    return res.render('app/auth/register-phone-number', { msg: req.flash('msg') });
  }

  viewVerifyPhoneNumber(req, res) {
    return res.render('/app/auth/verified-phone-number', { msg: req.flash('msg') });
  }

  viewVerifyEmail(req, res) {
    return res.render('/app/auth/register-verify');
  }

  async registerByEmail(req) {
    const {
    email, pwd,
    } = req.body;
    console.log('step2');
    return this.service.registerByEmail(email, pwd);
  }

async registerByPhoneNumber(req) {
    const {
 phoneNumber, password, firstName, lastName,
} = req.body;
  return this.service.registerByPhoneNumber(phoneNumber, password, firstName, lastName);
  }

 async verifyPhoneNumber(req, res) {
   const { codeVerify } = req.body;
   firebase.auth.ConfirmationResult.confirm(codeVerify)
     .then(() => {
       const credential = firebase.auth.PhoneAuthProvider.credential(
      codeVerify,
      );
      firebase.auth().signInWithCredential(credential);
       res.redirect('/');
     })
     .catch((error) => {
       req.flash('msg', error.message);
       res.redirect('/login');
     });
 }

  async signInWithEmail(req) {
    const { email, password } = req.body;
    return this.service.signInWithEmail(email, password);
  }

  async signInWithPhoneNumber(req, res) {
    const { phoneNumber, pwd } = req.body;
    return this.service.signInWithPhoneNumber(phoneNumber, pwd);
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
