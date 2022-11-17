import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account.entity";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Account, (account: Account) => account.transactions)
  debitedAccount: Account;

  @ManyToOne(() => Account, (account: Account) => account.transactions)
  creditedAccount: Account;
}
