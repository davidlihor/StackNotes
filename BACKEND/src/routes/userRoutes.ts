import express from "express";
const router = express.Router();
import usersController from "../controllers/usersController.js";
import verifyJWT from "../middleware/verifyJWT.js";
import verifyRoles from "../middleware/verifyRoles.js";
import ROLES_LIST from "../config/roles_list.js";

router.use(verifyJWT);

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Manager), usersController.createNewUser)
  .patch(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Manager), usersController.updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Manager), usersController.deleteUser);

export default router;
