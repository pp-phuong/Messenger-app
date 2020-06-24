import firebase from '../../../database/firebase';
import BaseController from '../../../infrastructure/Controllers/BaseController';
import Service from '../Services/AuthService';

class AuthController extends BaseController {
  constructor() {
    super();
    this.service = Service.getService();
  }

  isLogin(req, res) {
    const user = firebase.auth().currentUser;
    if (user) {
      res.redirect('/conversations');
    } else {
         return res.redirect('/login');
    }
  }
}
export default AuthController;
