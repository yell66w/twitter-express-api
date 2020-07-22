import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
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
  async register(request: Request, response: Response, next: NextFunction) {
    //issue - refactor or improve registration process
    const {
      firstName,
      lastName,
      age,
      username,
      password,
      confirmPassword,
    } = request.body;
    const saltRounds = 10;
    if (password != confirmPassword) {
      response.status(409).json({ message: "Passwords do not match" });
    }
    const isUserExists = await this.userRepository.findOne({
      where: { username },
    });
    if (!isUserExists) {
      try {
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const newUser = await this.userRepository.save({
          firstName,
          lastName,
          age,
          username,
          password: hashedPassword,
        });
        const token = jwtGenerator(newUser.id);
        response.json({ token });
      } catch (error) {
        response.status(500).json({ message: "Server error" });
      }
    }
    response.status(409).json({ message: "User already exists" });
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const { username, password } = request.body;

      const user = await this.userRepository.findOne({
        where: { username },
      });
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = jwtGenerator(user.id);
          response.json({ token });
        } else {
          response.status(401).json({ message: "Wrong username or password" });
        }
      } else {
        response.status(401).json({ message: "Wrong username or password" });
      }
    } catch (error) {
      response.status(500).json({ message: "Server Error" });
    }
  }

  async follow(request: Request, response: Response, next: NextFunction) {
    //refactor if you can
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
