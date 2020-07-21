import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { Http2ServerResponse } from "http2";
export class PostController {
  private postRepository = getRepository(Post);
  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.postRepository.find({ relations: ["user"] });
  }
  async one(request: Request, response: Response, next: NextFunction) {
    return this.postRepository.findOne(request.params.id, {
      relations: ["user"],
    });
  }
  async save(request: Request, response: Response, next: NextFunction) {
    const user = await this.userRepository.findOne(request.body.user, {
      relations: ["posts"],
    });
    const post = await this.postRepository.save({
      message: request.body.message,
    });
    user.posts.push(post);
    return await this.userRepository.save(user);
  }
  async remove(request: Request, response: Response, next: NextFunction) {
    const post = await this.postRepository.findOne(request.params.id);
    this.postRepository.remove(post);
    return true;
  }
}
