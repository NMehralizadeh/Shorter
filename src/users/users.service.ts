import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getByUsername(username: string): Promise<User | undefined> {
    let user = await this.userModel.findOne({ Username: username }).exec();
    return user;
  }

  async validateUser(username: string, pass: string): Promise<any>  { 
    const user = await this.getByUsername(username);
    if (user && (await compare(pass, user.Password))) {
      const { Password, ...result } = user;
      return result;
    }
    return null;
  }

  async createAdminUser() {
    const salt = await genSalt(10);
    const hashedPassword = await hash('admin', salt);
    const adminUser = new this.userModel({
      Id: 1,
      Username: 'admin',
      Password: hashedPassword,
      Salt: salt,
    });
    adminUser.save();
  }
}
