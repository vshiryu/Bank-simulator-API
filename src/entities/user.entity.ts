import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ length: 60 })
  name: string;

  @Column({ unique: true, length: 256 })
  email: string;

  @Column()
  age: number;

  @CreateDateColumn()
  memberSince: Date;

  //   @OneToOne(() => Accounts, {eager:true})
}
