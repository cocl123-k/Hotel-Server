import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { create } from 'domain';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>){
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() createUserDto: CreateUserDto){
        return this.authService.register(createUserDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('forgot-password')
    forgotPassword(@Body() dto: ForgotPasswordDto){
        return this.authService.forgotPassword(dto.email);
    }

    @HttpCode(HttpStatus.OK)
    @Post('reset-password')
    resetPassword(@Body() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto.email, dto.otp, dto.newPassword);
    }
}
