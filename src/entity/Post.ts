import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Length } from "class-validator";
@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  @Length(4, 200)
  message: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  user: User;
}
