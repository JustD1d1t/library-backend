import express from "express";
import { PersonController } from "../controllers/personController.js";

export const personRouter = new express.Router();

personRouter.post("/register", PersonController.register);
personRouter.post("/login", PersonController.login);
