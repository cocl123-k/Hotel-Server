import { IsString, IsNotEmpty, IsEmail, IsOptional, IsEnum, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  // Email không bắt buộc nhập (IsOptional)
  @IsEmail()
  @IsOptional()
  email?: string;

  // SĐT không bắt buộc nhập (IsOptional)
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Mật khẩu phải dài hơn 6 ký tự' })
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  role?: UserRole;
}