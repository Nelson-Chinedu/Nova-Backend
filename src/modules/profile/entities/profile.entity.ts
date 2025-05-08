import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import Account from '../../auth/entities/account.entity';
import TimeOffRequests from '../../time-off-request/entities/time-off-requests.entity';

export enum Department {
  DESIGN = 'Design',
  DEVELOPMENT = 'Development',
  HR = 'HR',
  PRODUCT_MANAGER = 'PM',
}

@Entity('Profile')
export default class Profile extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, default: '' })
  firstname: string;

  @Column('varchar', { length: 255, default: '' })
  lastname: string;

  @Column('varchar', { default: '' })
  phone_number: string;

  @Column('varchar', { default: '' })
  department: string;

  @Column('varchar', { length: 50, default: '' })
  job_title: string;

  @Column('varchar', { length: 50, default: '' })
  contract_type: string;

  @Column('varchar', { default: '' })
  image_url: string;

  @Column('varchar', { length: 30, default: '' })
  date_of_birth: string;

  @OneToOne(() => Account, (account: Account) => account.profile, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  account: Account;

  @OneToMany(
    () => TimeOffRequests,
    (timeOffRequests: TimeOffRequests) => timeOffRequests.account,
  )
  timeOffRequests: TimeOffRequests[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  add() {
    this.id = uuidV4();
  }
}
