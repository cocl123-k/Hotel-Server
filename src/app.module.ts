import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',            // <--- Đổi từ 'postgres' thành 'mysql'
      host: 'localhost',
      port: 3306,               // <--- Đổi port mặc định MySQL là 3306
      username: 'root',         // <--- User mặc định của MySQL thường là 'root'
      password: '',             // <--- Mật khẩu (XAMPP thường để trống, nếu bạn cài riêng thì điền vào)
      database: 'hotel_db',     // Tên database
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    UsersModule,
    RoomsModule,
    BookingsModule,
    PaymentsModule,
    AuthModule,
  ],
})
export class AppModule {}