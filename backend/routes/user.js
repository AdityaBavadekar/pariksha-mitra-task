import { Router } from "express";
import { getUserProfile, updateUserProfile, deleteUserProfile } from "../controllers/usersController.js"

const router = Router();

router.get("/", getUserProfile);
router.put("/", updateUserProfile);
router.delete("/", deleteUserProfile);

export { router as userRouter }