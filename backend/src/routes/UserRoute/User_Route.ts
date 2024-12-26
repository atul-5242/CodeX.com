import { Router } from "express";
import { getAllUser,getUserById } from "../../controller/User/UserData";
import { userMiddleware } from "../../middleware/auth";
const UserRoute = Router();

UserRoute.get("/getAllUser",getAllUser);
UserRoute.get("/getUserById",getUserById);

export default UserRoute;