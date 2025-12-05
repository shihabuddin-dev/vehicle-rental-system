import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.post("/auth/signup", userControllers.createUser);
router.get("/users", userControllers.getAllUser);
router.put('/users/:userId', userControllers.updateUser)

export const userRoutes = router;
