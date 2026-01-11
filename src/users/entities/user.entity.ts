import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // 1. Email cho phép null (nếu đăng ký bằng SĐT)
  @Column({ unique: true, nullable: true }) 
  email: string;

  // 2. Thêm số điện thoại, cho phép null, không được trùng
  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Column({ type: 'varchar', nullable: true })
  resetToken: string | null;

  @Column({ type: 'datetime', nullable: true })
  resetTokenTime: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}