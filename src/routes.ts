import { UserController } from "./controller/UserController";
import { PostController } from "./controller/PostController";
const authorization = require("./middleware/authorization");
export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },
  {
    method: "put",
    route: "/users/:id",
    controller: UserController,
    action: "update",
  },
  {
    method: "post",
    route: "/users/:id/follow",
    controller: UserController,
    action: "follow",
  },
  {
    method: "post",
    route: "/register",
    controller: UserController,
    action: "register",
  },
  {
    method: "post",
    route: "/login",
    controller: UserController,
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
    route: "/posts",
    controller: PostController,
    action: "all",
  },
  {
    method: "post",
    route: "/posts",
    controller: PostController,
    action: "save",
  },
  {
    method: "delete",
    route: "/posts/:id",
    controller: PostController,
    action: "remove",
  },
  {
    method: "get",
    route: "/posts/:id",
    controller: PostController,
    action: "one",
  },
];
