import * as express from "express";
import entitiesCtrl from "./entities-controller";
const router = express.Router();

router.route("/").post(entitiesCtrl.createEntity);
router.route("/search").post(entitiesCtrl.getEntities)
export default router;
