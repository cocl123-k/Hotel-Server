import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Room } from '../../rooms/entities/room.entity';

export enum BookingStatus {
  PENDING = 'pending',     // Chờ xác nhận
  CONFIRMED = 'confirmed', // Đã xác nhận
  CANCELLED = 'cancelled', // Đã hủy
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  checkInDate: Date;

  @Column()
  checkOutDate: Date;

  @Column()
  totalPrice: number; // Tổng tiền = Giá phòng * số ngày

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @CreateDateColumn()
  createdAt: Date; // Ngày giờ khách bấm nút đặt

  // Quan hệ: Nhiều đơn Booking thuộc về 1 User (Many-to-One)
  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  // Quan hệ: Nhiều đơn Booking thuộc về 1 Room (Many-to-One)
  @ManyToOne(() => Room, (room) => room.bookings)
  room: Room;
}