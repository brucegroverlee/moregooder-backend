import express from "express";
const router = express.Router();

import { authentication } from "../../../shared/middlewares/authentication";
import { validateBody } from "../../../shared/adapters/middlewares/validateBody";

import { signupBody } from "../middlewares/signupBody";
import { signupController } from "./signupController";

import { loginBody } from "../middlewares/loginBody";
import { loginController } from "./loginController";

import { meController } from "./meController";

router.post("/signup", validateBody(signupBody), signupController);
router.post("/login", validateBody(loginBody), loginController);
router.get("/me", authentication, meController);

export default router;