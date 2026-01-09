import { Injectable, BadRequestException } from '@nestjs/common'; // Thêm BadRequestException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

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

    // 2. Tạo user mới
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  // ... các hàm khác giữ nguyên
}