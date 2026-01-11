import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number; // Số tiền thanh toán

  @Column()
  provider: string; // Ví dụ: 'VNPAY', 'MOMO', 'STRIPE'

  @Column({ nullable: true })
  transactionId: string; // Mã giao dịch từ phía ngân hàng gửi về (để tra soát)

  @Column({ default: 'PENDING' })
  status: string; // 'PENDING' (đang chờ), 'SUCCESS' (thành công), 'FAILED' (thất bại)

  @CreateDateColumn()
  paymentDate: Date;

  // Quan hệ 1-1: Một đơn đặt phòng có một thanh toán thành công
  @OneToOne(() => Booking)
  @JoinColumn() // Cột bookingId sẽ được tạo ở bảng này
  booking: Booking;
}