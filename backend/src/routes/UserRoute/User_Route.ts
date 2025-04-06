import { Router } from "express";
import { getAllUser,getUserById } from "../../controller/User/UserData";
import { authenticateToken } from "../../middleware/auth";
const UserRoute = Router();

UserRoute.get("/getAllUser",authenticateToken,getAllUser);
UserRoute.get("/getUserById",getUserById);

export default UserRoute;