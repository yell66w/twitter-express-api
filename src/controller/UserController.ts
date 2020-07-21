import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { type } from "os";

export class UserController {
  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find({
      relations: ["posts", "followers", "following"],
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne(request.params.id, {
      relations: ["posts"],
    });
    userToRemove.posts;

    await this.userRepository.remove(userToRemove);
    return userToRemove;
  }
  async update(request: Request, response: Response, next: NextFunction) {
    await this.userRepository.update(request.params.id, request.body);
    return true;
  }

  async follow(request: Request, response: Response, next: NextFunction) {
    const targetUser = await this.userRepository.findOne(request.params.id, {
      relations: ["followers"],
    });
    const currentUser = await this.userRepository.findOne(8, {
      relations: ["following"],
    }); //subject to change 5
    let following = false;
    currentUser.following.map((followedUser, index) => {
      if (parseInt(request.params.id) === followedUser.id) {
        following = true;
        currentUser.following.splice(index, 1);
        targetUser.followers.map((follower, index2) => {
          if (currentUser.id === follower.id) {
            targetUser.followers.splice(index2, 1);
          }
        });
      }
    });
    if (!following) {
      currentUser.following.push(targetUser);
      targetUser.followers.push(currentUser);
    }
    await this.userRepository.save(currentUser);

    await this.userRepository.save(targetUser);
    return following ? "Unfollowed" : "Followed";
  }
}
