import firebase from '../../../config/firebase';
import BaseController from '../../../infrastructure/Controllers/BaseController';
import Service from '../Services/AuthService';

class AuthController extends BaseController {
  constructor() {
    super();
    this.service = Service.getService();
  }

  isLogin(req, res, next) {
    const user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
     return res.redirect('/login');
    }
  }

  isNotLogin(req, res, next) {
    const user = firebase.auth().currentUser;
    if (user == null) {
      next();
    } else {
     return res.redirect('/conversations');
    }
  }
}
export default AuthController;
