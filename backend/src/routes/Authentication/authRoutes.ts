import { Router } from "express";
import { login } from "../../controller/Auth/login";
import { signIn } from "../../controller/Auth/signIn";
import { userMiddleware } from "../../middleware/auth";

const authRoutes = Router();
//@ts-ignore
authRoutes.post("/login",login);
//@ts-ignore
authRoutes.post("/signIn",signIn);


export default authRoutes;