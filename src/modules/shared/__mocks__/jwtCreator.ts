import jwt from "jsonwebtoken";

import { IDType } from "../entities/types";
import config from "../../../frameworks/config";

const JWT_SECRET: string = config.jwt.JWT_SECRET;
const JWT_EXPIRES_IN: string = config.jwt.JWT_EXPIRES_IN;

export function jwtCreator(userId: IDType): string {
  const token = jwt.sign({
    userId,
  }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return token;
}