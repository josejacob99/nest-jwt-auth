import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/common/schemas/user.schemas';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'User', schema: UserSchema,
    }])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UserModule {}
