import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Account from '../../auth/entities/account.entity';
import Profile from '../../profile/entities/profile.entity';

enum REQUEST_STATUS {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('TimeOffRequests')
export default class TimeOffRequests extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  leaveType: string;

  @Column('varchar')
  leaveFrom: Date;

  @Column('varchar')
  leaveTo: Date;

  @Column('int', { nullable: true })
  leaveDays: number;

  @Column({
    type: 'enum',
    enum: REQUEST_STATUS,
    default: REQUEST_STATUS.PENDING,
  })
  status: string;

  @ManyToOne(() => Account, (account: Account) => account.timeOffRequests, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  account: Account;

  @ManyToOne(() => Profile, (profile: Profile) => profile.timeOffRequests, {
    eager: true,
    onDelete: 'CASCADE',
  })
  profile: Profile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
