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

import Recruitment from '../../recruitment/entities/recruitment.entity';

import { PIPELINE_STAGE } from '../../../common/constant/pipeline-stage';

@Entity('Candidates')
export default class Candidate extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, default: '' })
  firstname: string;

  @Column('varchar', { length: 255, default: '' })
  lastname: string;

  @Column('varchar', { length: 100, default: '' })
  email: string;

  @Column('varchar', { length: 200, default: '' })
  social: string;

  @Column('varchar', { length: 255, default: '' })
  url: string;

  @Column({
    type: 'enum',
    enum: PIPELINE_STAGE,
    default: PIPELINE_STAGE.SOURCED,
  })
  pipeline_stage: string;

  @ManyToOne(
    () => Recruitment,
    (recruitment: Recruitment) => recruitment.candidates,
    {
      onDelete: 'CASCADE',
      eager: true,
    },
  )
  @JoinColumn()
  recruitment: Recruitment;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
