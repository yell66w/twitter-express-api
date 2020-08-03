import { NextFunction, Request, Response } from "express";
require("dotenv").config();

module.exports = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    next();
  } catch (error) {
    response.status(403).json({ message: "Not nice" });
  }
};
