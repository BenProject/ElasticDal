import * as express from "express";
import entitiesCtrl from "./entities-controller";
const router = express.Router();

router.route("/").post(entitiesCtrl.createEntity).get(entitiesCtrl.getEntities);

export default router;
