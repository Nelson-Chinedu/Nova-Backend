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
