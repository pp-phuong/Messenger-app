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

  view(req, res) {
    return res.render('app/conversation/index');
  }

  viewRegisterByPhoneNumber(req, res) {
    return res.render('app/auth/register-phone-number');
  }

  async registerByEmail(req, res) {
    const {
 email, password, firstName, lastName,
} = req.body;
    // const user = { email, password };
    // console.log(user);
    // console.log(email.emailVerified);
    try {
      //  if (email.emailVerified !== undefined) {
      firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log('register successfull');
      //  } else {
      //    firebase.auth().currentUser.sendEmailVerification(email);
      //    console.log('Sent verify email');
      //  }
    } catch (e) {
      return res.json(e.message);
    }
    await knex('users').insert({
      firstName,
      lastName,
      email,
      password,
    });
    return res.redirect('/login');
  }

  async signInWithEmail(req, res) {
    const { email, password } = req.body;
    // try {
    //   await firebase.auth().signInWithEmailAndPassword(email, password);
    // } catch (error) {
    //   if (error.code === 'auth/wrong-password') {
    //     return res.status(400).json({ message: 'Wrong password' });
    //   }
    //   return res.status(400).json(error.message);
    // }
    // return res.redirect('/');
    const user = firebase.auth().currentUser;
   try {
      if (user.emailVerified) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      } else {
      user.sendEmailVerification();
      }
      return res.redirect('/');
    } catch (e) {
          console.log(e);
        }
  }

  async registerByPhoneNumber(req, res) {
    const {
 phoneNumber, password, firstName, lastName,
} = req.body;
    firebase.auth().languageCode = 'it';
    firebase.auth().useDeviceLanguage();

    await knex('users').insert({
      firstName,
      lastName,
      phoneNumber,
      password,
    });
    return res.redirect('/login');
  }

  async signInWithPhoneNumber(req, res) {
    res.redirect('/');
  }
}
export default AuthController;
