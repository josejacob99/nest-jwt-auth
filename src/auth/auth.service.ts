import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import { EmailAuthDto } from './dto/emailLogin.dto';
import { IUsers } from 'src/common/interface/user.interface';
import Utils from 'src/common/utils';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async emailLogin(dto: EmailAuthDto) {
        const user = await this.usersService.findOneByEmail(dto.email);

        if (user && await user.comparePassword(dto.password, user.password)) {
                return Utils.sendResponse(true, { userExist: true, user, accessToken: this.getJWTToken(user) }, 'Existing user');
        }
        throw new UnauthorizedException();
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && user.password === pass && user.isAdmin) {
            delete user.password;
            return user;
        }
        return false;
    }

    async verifyUser(userId: string): Promise<any> {
        const user = await this.usersService.findOne(userId);
        if (user) {
            return { user, accessToken: this.getJWTToken(user) };
        }
        return 0;
    }

    private getJWTToken(user: IUsers): string {
        const payload = { email: user.email, password: user.password, userId: user.id, sub: user.id };
        return this.jwtService.sign(payload);
    }
}
