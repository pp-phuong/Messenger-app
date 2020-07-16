import bcrypt from 'bcrypt';
import BaseRepository from '../../../infrastructure/Repositories/BaseRepository';
import knex from '../../../database/connection';

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

  // json-webtoken npm
  async signInWithEmail(email, password) {
    const user = await knex('users')
      .where({
        email,
      })
      .first();
    console.log(user);
    if (user === undefined) throw new Error('Email is not exist');
    else {
  bcrypt.compare(password, user.password, (err, result) => {
      if (!result) {
        throw new Error('Wrong password ! ');
      }
    });
    }
    console.log('done');
  }

  async registerByEmail(email, hashedPwd) {
   const user = await knex('users')
     .where({
       email,
     })
     .first();
    if (user === undefined) {
      await this.create({
        email,
        password: hashedPwd,
      });
    } else {
      throw new Error('Email already in use');
    }
  }

  async signInWithPhoneNumber(phoneNumber, pwd) {
    const user = await this.listBy('phone-number');
    console.log(user);
    console.log(phoneNumber + pwd);
  }
}

export default AuthRepository;
