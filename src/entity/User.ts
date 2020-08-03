import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Post } from "./Post";
import { Length } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  @Length(1, 255)
  username: string;

  @Column()
  password: string;

  @Column()
  @Length(1, 255)
  displayName: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  following: User[];
}
