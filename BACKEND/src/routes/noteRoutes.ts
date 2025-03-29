import express from "express";
const router = express.Router();
import notesController from "../controllers/notesController.js";
import verifyJWT from "../middleware/verifyJWT.js";
import verifyRoles from "../middleware/verifyRoles.js";
import ROLES_LIST from "../config/roles_list.js";

router.use(verifyJWT);

router
  .route("/")
  .get(notesController.getAllNotes)
  .post(verifyRoles(ROLES_LIST.Employee), notesController.createNote)
  .patch(verifyRoles(ROLES_LIST.Employee), notesController.updateNote)
  .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Manager), notesController.deleteNote);

export default router;
