import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  following: User[];
}
