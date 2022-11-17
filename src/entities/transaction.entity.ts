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

  // @ManyToOne(() => Account, (account: Account) => account.transactions, {
  //   eager: true,
  // })
  // debitedAccount: Account;

  // @ManyToOne(() => Account, (account: Account) => account.transactions, {
  //   eager: true,
  // })
  // creditedAccount: Account;
  @ManyToOne(() => Account, (account: Account) => account.debitTransactions)
  debitedAccount: Account;
  @ManyToOne(() => Account, (account: Account) => account.creditTransactions)
  creditedAccount: Account;
}
