import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/entities/user.entity';
import * as nodemailer from 'nodemailer';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwyService: JwtService,
    ) {}

    async signIn(username: string, password: string) : Promise<any> {
        const user = await this.usersService.findByEmailorPhone(username);

        if (!user){
            throw new UnauthorizedException('Tài khoản không tồn tại');
        }

        const isMatch = await bcrypt.compare(password, user.password);
       
        if (!isMatch) {
        throw new UnauthorizedException('Sai mật khẩu');
        }

        const payload = { sub: user.id, username: user.email, role: user.role };
        return {
            access_token: await this.jwyService.signAsync(payload),
            user : {
                is : user.id,
                email : user.email,
                fullname : user.fullName,
                role : user.role
            }
        };
    }

    async register(createUserDto: CreateUserDto) {
        createUserDto.role = UserRole.CUSTOMER;

        return this.usersService.create(createUserDto);
    }

    async forgotPassword(email : string){
        const user = await this.usersService.findByEmailorPhone(email);
        if (!user) {
            throw new NotFoundException('Emmai không tồn tại');
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        await this.usersService.setResetToken(user.id, otp);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kientt.23810310129@epu.edu.vn', // <--- Thay Email của bạn vào đây
                pass: 'ywvf slwn nadn gisl', // <--- Dán cái App Password vừa lấy ở Bước 2 vào đây
            },
        });

        await transporter.sendMail({
            from: '"Hotel Support" <no-reply@hotel.com>', // Tên người gửi
            to: email, // Gửi đến email khách hàng
            subject: 'Mã xác nhận đổi mật khẩu', // Tiêu đề
            text: `Mã xác nhận của bạn là: ${otp}. Mã này sẽ hết hạn sau 15 phút.`, // Nội dung
            html: `<b>Mã xác nhận của bạn là: <h2>${otp}</h2></b><p>Mã này sẽ hết hạn sau 15 phút.</p>`, // Nội dung đẹp hơn
        });

        return {
            message: 'Mã xác nhận đã gửi về email của bạn.',
            OTP : otp,
        }
    }

    async resetPassword(email : string, otp : string, newPassword: string){
        const user = await this.usersService.findByResetToken(otp);

        if (!user) {
            throw new NotFoundException('Mã xác nhận không đúng');
        }

        if (user.email != email
            || !user.resetTokenTime 
            || user.resetTokenTime < new Date()){
            throw new NotFoundException('Mã xác nhận không đúng');
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await this.usersService.updatePassword(user.id, hashedPassword);
        await this.usersService.clearResetToken(user.id);

        return {message : 'Đổi mật khẩu thành công!'};
    }
}
