import { Controller, Post, Body } from '@nestjs/common';
import { EmailAuthDto } from './dto/emailLogin.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    async emailLogin(@Body() auth: EmailAuthDto) {
        return this.authService.emailLogin(auth);
    }
}
