import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from './rooms/rooms.module'; // Sẽ tạo ở bước 3
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // hoặc 'mysql'
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Thay bằng user DB của bạn
      password: 'yourpassword', // Thay bằng pass DB của bạn
      database: 'hotel_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Tự động tạo bảng (chỉ dùng khi dev)
    }),
    RoomsModule,
    UsersModule,
    BookingsModule,
  ],
})
export class AppModule {}