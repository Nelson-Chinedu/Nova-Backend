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

import Account from 'src/modules/auth/entities/account.entity';

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

  @ManyToOne(() => Account, (account: Account) => account.timeOffRequests, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  account: Account;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
