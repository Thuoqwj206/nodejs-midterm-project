import { Router } from "express";
import middlewareController from "../controllers/middlewareController";
import projectController from "../controllers/projectController";

const router = Router()

router.get('/get', middlewareController.verifyToken, projectController.getAllProject)
router.get('/get/:id', middlewareController.verifyToken, projectController.getProjectById)
router.post('/create', middlewareController.verifyToken, projectController.createProject)
router.put('/update/:id', middlewareController.verifyToken, projectController.updateProject)
router.delete('/delete/:id', middlewareController.verifyAdmin, projectController.deleteProject)
router.put('/add-member/:id', middlewareController.verifyAdmin, projectController.addProjectMember)
router.put('/delete-member/:id', middlewareController.verifyAdmin, projectController.deleteMemberFromProject)


export default router;