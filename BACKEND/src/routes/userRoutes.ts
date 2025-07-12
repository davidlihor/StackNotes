import express from "express";
const router = express.Router();
import usersController from "../controllers/usersController";
import verifyJWT from "../middleware/verifyJWT";
import verifyRoles from "../middleware/verifyRoles";
import ROLES_LIST from "../config/roles_list";

router.use(verifyJWT);

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Manager), usersController.createNewUser)
  .patch(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Manager), usersController.updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Manager), usersController.deleteUser);

export default router;
