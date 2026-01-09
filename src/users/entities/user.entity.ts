import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

// Định nghĩa Enum cho Role để tránh nhập sai
export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Email không được trùng nhau
  email: string;

  @Column()
  password: string; // Lưu ý: Sau này sẽ mã hóa password trước khi lưu

  @Column()
  fullName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER, // Mặc định tạo ra là khách hàng
  })
  role: UserRole;

  @CreateDateColumn() // Tự động lưu thời gian tạo tài khoản
  createdAt: Date;

  // Quan hệ: Một User có thể có nhiều đơn đặt phòng (One-to-Many)
  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}