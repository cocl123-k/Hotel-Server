import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Ví dụ: "Phòng 101 - Vip"

  @Column()
  price: number; // Giá theo đêm

  @Column({ default: true })
  isAvailable: boolean; // Trạng thái: Đang trống hay đang sửa chữa

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string; // Đường dẫn ảnh phòng

  // Quan hệ: Một Phòng có thể nằm trong nhiều đơn đặt (ở các ngày khác nhau)
  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];
}