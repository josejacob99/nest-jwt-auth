import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsers } from 'src/common/interface/user.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUsers>) { }


    async findOne(id: string): Promise<any> {
        const user = await this.userModel.findOne({ _id: id });

        return user
    }

    async findOneByEmail(email: string): Promise<IUsers> {
        return await this.userModel.findOne({ email });
    }

    async createUser(u: Partial<IUsers>): Promise<IUsers> {
        const user: Partial<IUsers> = {
            name: u.name,
            email: u.email,
            phone: u.phone,
            password: u.password,
        };

        const newUser = new this.userModel(user);

        return await newUser.save();
    }
}