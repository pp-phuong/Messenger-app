import firebase from '../../../database/firebase';
import BaseController from '../../../infrastructure/Controllers/BaseController';
import Service from '../Services/AuthService';

class AuthController extends BaseController {
  constructor() {
    super();
    this.service = Service.getService();
  }

  isLogin(req, res, next) {
    const user = firebase.auth().currentUser;
    console.log(firebase.auth().currentUser);
    if (user) {
      next();
    } else {
     return res.redirect('/login');
    }
  }

  isNotLogin(req, res, next) {
    const user = firebase.auth().currentUser;
    if (user == null) {
      console.log(1);
      next();
    } else {
      console.log(1);
     return res.redirect('/conversations');
    }
  }
}
export default AuthController;
