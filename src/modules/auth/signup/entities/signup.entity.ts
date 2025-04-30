import { v4 as uuidV4 } from 'uuid';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import Profile from '../../../profile/entities/profile.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('Account')
export default class Account extends BaseEntity {
  @PrimaryColumn('uuid')
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
    enum: UserRole,
    default: UserRole.USER,
  })
  role: string;

  @OneToOne(() => Profile, (profile: Profile) => profile.account)
  profile: Profile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
