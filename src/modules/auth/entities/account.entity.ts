import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Profile from '../../profile/entities/profile.entity';
import TimeOffRequests from '../../time-off-request/entities/time-off-requests.entity';

import { SYSTEM_ROLES } from '../../../common/constant/system-roles';

@Entity('Account')
export default class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column('boolean', { default: false })
  blocked: boolean;

  @Column('boolean', { default: false })
  verified: boolean;

  @Column({
    type: 'enum',
    enum: SYSTEM_ROLES,
    default: SYSTEM_ROLES.USER,
  })
  role: string;

  @OneToOne(() => Profile, (profile: Profile) => profile.account)
  profile: Profile;

  @OneToMany(
    () => TimeOffRequests,
    (timeOffRequests: TimeOffRequests) => timeOffRequests.account,
  )
  timeOffRequests: TimeOffRequests[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
