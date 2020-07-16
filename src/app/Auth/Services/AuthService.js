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

  async signInWithEmail(email, password) {
    await this.repository.signInWithEmail(email, password);
  }

  async registerByEmail(email, pwd) {
    bcrypt.hash(pwd, saltRounds, async (err, hashPwd) => {
      await this.repository.registerByEmail(email, hashPwd);
    });
  }

  async signInWithPhoneNumber(phoneNumber, pwd) {
    await this.repository.signInWithPhoneNumber(phoneNumber, pwd);
  }
}

export default AuthService;
