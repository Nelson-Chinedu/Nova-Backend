import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Account from '../../auth/entities/account.entity';

@Entity('Recruitments')
export default class Recruitment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  job_title: string;

  @Column('varchar', { length: 30 })
  job_type: string;

  @Column('varchar', { length: 50 })
  department: string;

  @Column('varchar', { length: 50 })
  location: string;

  @Column('text')
  description: string;

  @Column('text')
  about_company: string;

  @Column('varchar', { length: 30 })
  active_until: string;

  @ManyToOne(() => Account, (account: Account) => account.recruitment, {
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
