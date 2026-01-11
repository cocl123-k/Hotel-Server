import { IsEmail, IsNotEmpty, MinLength, IsString, } from "class-validator";

export class ForgotPasswordDto{
    @IsEmail()
    email : string;
}

export class ResetPasswordDto{
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    otp: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;
}