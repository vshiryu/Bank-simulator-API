import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Transaction } from "./transaction.entity";
import { Exclude } from "class-transformer";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: 100 })
  @Exclude()
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.id)
  transactions: Transaction[];
}
