import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

// import Account from 'src/signup/entities/signup.entity';
import Account from '../../signup/entities/signup.entity';

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

  @OneToOne(() => Account, (account: Account) => account.profile, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  account: Account;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  add() {
    this.id = uuidV4();
  }
}
