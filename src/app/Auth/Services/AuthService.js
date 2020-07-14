import bcrypt from 'bcrypt';
import Repository from '../Repositories/AuthRepository';

const saltRounds = 10;
class AuthService {
  static service;

  constructor() {
    this.repository = Repository.getRepository();
  }

  static getService() {
    if (!this.service) {
      this.service = new this();
    }
    return this.service;
  }

  signInWithEmail(email, password) {
    return this.repository.signInWithEmail(email, password);
  }

  registerByEmail(email, pwd) {
    bcrypt.hash(pwd, saltRounds, async (err, hashPwd) => 
    this.repository.registerByEmail(email, hashPwd));
  }

  signInWithPhoneNumber(phoneNumber, pwd) {
    return this.repository.signInWithPhoneNumber(phoneNumber, pwd);
  }
}

export default AuthService;
