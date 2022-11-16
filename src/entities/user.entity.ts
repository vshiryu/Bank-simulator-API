import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Account } from "./account.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ length: 50 })
  name: string;

  @Column({ unique: true, length: 256 })
  email: string;

  @Column()
  age: number;

  @CreateDateColumn()
  memberSince: Date;

  @OneToOne(() => Account, { eager: true })
  @JoinColumn()
  account: Account;
}
