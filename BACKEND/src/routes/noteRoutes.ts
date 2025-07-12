import express from "express";
const router = express.Router();
import notesController from "../controllers/notesController";
import verifyJWT from "../middleware/verifyJWT";
import verifyRoles from "../middleware/verifyRoles";
import ROLES_LIST from "../config/roles_list";

router.use(verifyJWT);

router
  .route("/")
  .get(notesController.getAllNotes)
  .post(verifyRoles(ROLES_LIST.Employee), notesController.createNote)
  .patch(verifyRoles(ROLES_LIST.Employee), notesController.updateNote)
  .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Manager), notesController.deleteNote);

export default router;
