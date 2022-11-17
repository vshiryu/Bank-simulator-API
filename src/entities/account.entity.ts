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
import { User } from "./user.entity";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: 100 })
  @Exclude()
  balance: number;

  // @OneToMany(() => Transaction, (transaction) => transaction.id)
  // transactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount, {
    eager: true,
  })
  @Exclude()
  debitTransactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.creditedAccount, {
    eager: true,
  })
  @Exclude()
  creditTransactions: Transaction[];
}
