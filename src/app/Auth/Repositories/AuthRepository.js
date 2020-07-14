import firebase from '../../../config/firebase';
import BaseRepository from '../../../infrastructure/Repositories/BaseRepository';
// import knexfile from '../../../../knexfile';

class AuthRepository extends BaseRepository {
  static repository;

  static getRepository() {
    if (!this.repository) {
      this.repository = new this();
    }

    return this.repository;
  }

  getTableName() {
    return 'users';
  }

  async signInWithEmail(email, password, res) {
    const user = this.listBy('email');
    if (user.password === password) {
      firebase.auth().signInWithEmailAndPassword(email, password);
    }
    const data = { email, password };
    console.log(data);
    return res.json({
      message: data,
    });
  }

  async registerByEMail(req, res, email, pwd) {
    const user = this.listBy('email');
    if (!user) {
      this.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email,
        pwd,
      });
      console.log('done');
      return res.json({
        message: 'create user success',
      });
    }
  }

  async signInWithPhoneNumber(phoneNumber, pwd) {
    const user = this.listBy('phone-number');
    console.log(user);
    console.log(phoneNumber + pwd);
  }
}

export default AuthRepository;
