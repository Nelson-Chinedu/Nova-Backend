import { v4 as uuidV4 } from 'uuid';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Entity('Account')
export default class Account extends BaseEntity {
  @Index('id')
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  blocked: boolean;

  @BeforeInsert()
  addId() {
    this.id = uuidV4();
  }
}
