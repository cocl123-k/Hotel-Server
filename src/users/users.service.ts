import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'; // Thêm BadRequestException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { promises } from 'dns';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 1. Kiểm tra: Phải có ít nhất Email hoặc SĐT
    if (!createUserDto.email && !createUserDto.phoneNumber) {
      throw new BadRequestException('Phải cung cấp Email hoặc Số điện thoại!');
    }

    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hashedPassword;

    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy User có id: ${id}`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id); // Trả về thông tin sau khi update
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
    return { message: `Đã xóa user #${id} thành công` };
  }

  async findByEmailorPhone(username: string) : Promise<User | null> {
    return this.usersRepository.findOne({
      where: [
        {email: username},
        {phoneNumber: username}
      ]
    })
  }

  async setResetToken(userID: number, token: string){
    const tokenTime = new Date();
    tokenTime.setMinutes(tokenTime.getMinutes() + 5);

    await this.usersRepository.update(userID, {
      resetToken: token,
      resetTokenTime: tokenTime
    });
  }

  async findByResetToken(token: string) : Promise<User | null> {
    return this.usersRepository.findOne({
      where: {resetToken : token},
    })
  }

  async clearResetToken(userID : number) {
    await this.usersRepository.update(userID, {
      resetToken: null,
      resetTokenTime : null,
    });
  }

  async updatePassword(userID: number, newPassword: string){
    await this.usersRepository.update(userID, {
      password : newPassword
    });
  }
}