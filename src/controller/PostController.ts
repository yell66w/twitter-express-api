import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { validate } from "class-validator";
export class PostController {
  private postRepository = getRepository(Post);
  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.postRepository.find({
      relations: ["user"],
      order: {
        createdAt: "DESC",
      },
    });
  }
  async one(request: Request, response: Response, next: NextFunction) {
    return this.postRepository.findOne(request.params.id, {
      relations: ["user"],
    });
  }
  async save(request: Request, response: Response, next: NextFunction) {
    const user = await this.userRepository.findOne(request.user, {
      relations: ["posts"],
    });
    let post = new Post();
    post.message = request.body.message;

    const errors = await validate(post);
    if (errors.length > 0) {
      response.status(403).json({ message: "Validation Failed" });
    } else {
      await this.postRepository.save(post);
      user.posts.push(post);
      await this.userRepository.save(user);
      response.json({
        message: true,
      });
    }
  }
  async remove(request: Request, response: Response, next: NextFunction) {
    const post = await this.postRepository.findOne(request.params.id);
    this.postRepository.remove(post);
    return true;
  }
}
