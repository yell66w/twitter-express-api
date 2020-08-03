const jwt = require("jsonwebtoken");
import { NextFunction, Request, Response } from "express";
require("dotenv").config();

module.exports = async (
  request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  try {
    const jwtToken = await request.header("token");
    if (!jwtToken) {
      response.status(403).json({ message: "No Token" });
    }
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    request.user = payload.user;
    nextFunction();
  } catch (error) {
    response.status(403).json({ message: "Server Error Token" });
  }
};
