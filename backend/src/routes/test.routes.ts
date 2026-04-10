import {testController} from "../controllers/test.controller"
import { Router } from "express"

const router = Router();

router.post("/test",testController);

export default router;