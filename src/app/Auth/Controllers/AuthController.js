import firebase from '../../../database/firebase';
import BaseController from '../../../infrastructure/Controllers/BaseController';
import Service from '../Services/AuthService';
import knex from '../../../database/connection';

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

  async registerByEmail(req, res) {
    const {
    email, password, firstName, lastName,
    } = req.body;
    try {
        await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
          console.log('register successfull');
           console.log('sent');
          knex('users').insert({
           firstName,
           lastName,
           email,
           password,
         });
         firebase.auth().signOut();
         res.redirect('/login');
        } catch (error) {
          res.json(error);
        }
       }

async registerByPhoneNumber(req, res) {
    const {
 phoneNumber, password, firstName, lastName,
} = req.body;
    firebase.auth().signInWithPhoneNumber(phoneNumber)
    .catch((error) => {
      res.json(error);
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
     .then((result) => {
       // User signed in successfully.
       const { user } = result;
       // ...
     })
     .catch((error) => {
       res.json(error);
     });
    const credential = firebase.auth.PhoneAuthProvider.credential(
      codeVerify,
    );
    firebase.auth().signInWithCredential(credential);
 }

  async signInWithEmail(req, res) {
    const { email, password } = req.body;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      return res.status(400).json(error.message);
    }
    const user = firebase.auth().currentUser;
    try {
      if (user.emailVerified) {
        res.redirect('/');
      } else {
        user.sendEmailVerification();
         res.render('/app/auth/conversation/email-verified');
      }
    } catch (e) {
      res.status(400).json(e.message);
    }
  }

  async signInWithPhoneNumber(req, res) {
    res.redirect('/');
  }

  signOut(req, res) {
    try {
      firebase.auth().signOut();
      console.log('out');
      res.redirect('/login');
    } catch (error) {
        res.json(error.message);
    }
  }
}
export default AuthController;
