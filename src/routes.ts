import { UserController } from "./controller/UserController";
import { PostController } from "./controller/PostController";

const authorization = require("./middleware/authorization");
const check = require("./middleware/check");

//issue - Not Scalable
export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    middleware: authorization,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    middleware: authorization,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    middleware: authorization,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    middleware: authorization,
    action: "remove",
  },
  {
    method: "put",
    route: "/users/:id",
    controller: UserController,
    middleware: authorization,
    action: "update",
  },
  {
    method: "post",
    route: "/users/:id/follow",
    controller: UserController,
    middleware: authorization,
    action: "follow",
  },
  {
    method: "post",
    route: "/register",
    controller: UserController,
    middleware: check,
    action: "register",
  },
  {
    method: "post",
    route: "/login",
    controller: UserController,
    middleware: check,
    action: "login",
  },
  {
    method: "get",
    route: "/verify",
    controller: UserController,
    middleware: authorization,
    action: "verify",
  },
  {
    method: "get",
    route: "/profile",
    controller: UserController,
    middleware: authorization,
    action: "profile",
  },
  {
    method: "get",
    route: "/who-to-follow",
    controller: UserController,
    middleware: authorization,
    action: "whoToFollow",
  },
  {
    method: "get",
    route: "/posts",
    controller: PostController,
    middleware: authorization,
    action: "all",
  },
  {
    method: "post",
    route: "/posts",
    controller: PostController,
    middleware: authorization,
    action: "save",
  },
  {
    method: "delete",
    route: "/posts/:id",
    controller: PostController,
    middleware: authorization,
    action: "remove",
  },
  {
    method: "get",
    route: "/posts/:id",
    controller: PostController,
    middleware: authorization,
    action: "one",
  },
];
