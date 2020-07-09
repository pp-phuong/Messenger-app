import firebase from '../../../config/firebase';
import BaseController from '../../../infrastructure/Controllers/BaseController';
import Service from '../Services/AuthService';
import knex from '../../../database/connection';

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

  async registerByEmail(req, res) {
    const {
    email, password, firstName, lastName,
    } = req.body;
    try {
        await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
          knex('users').insert({
           firstName,
           lastName,
           email,
           password,
         });
         const user = firebase.auth().currentUser;
          user.sendEmailVerification();
         firebase.auth().signOut();
         res.render('app/auth/register-verify');
        } catch (error) {
            req.flash('msg', error.message);
            return res.redirect('/register-email');
        }
       }

async registerByPhoneNumber(req, res) {
    const {
 phoneNumber, password, firstName, lastName,
} = req.body;
    firebase.auth().signInWithPhoneNumber(phoneNumber)
    .catch((error) => {
      req.flash('msg', error.message);
    });
    await knex('users').insert({
      firstName,
      lastName,
      phoneNumber,
      password,
    });
    return res.redirect('/verify-phone-number');
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

  async signInWithEmail(req, res) {
    const { email, password } = req.body;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      if (user.emailVerified) {
        res.redirect('/');
      } else {
         firebase.auth().signOut();
        req.flash('msg', 'Please verify your email to login !');
        res.redirect('/login');
      }
    } catch (error) {
     req.flash('msg', error.message);
     return res.redirect('/login');
    }
  }

  async signInWithPhoneNumber(req, res) {
    res.redirect('/verify-phone-number');
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
