import { Router } from "express";
import userController from "../controllers/userController";
import middlewareController from "../controllers/middlewareController";

const router = Router()

router.get('/get', middlewareController.verifyToken, userController.getAllUser)
router.delete('/delete/:id', middlewareController.verifyAdmin, userController.deleteUser)

export default router;