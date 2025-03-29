import { Router, RequestHandler } from "express";
import {
  getCharacter,
  equipItem,
  unequipItem
} from "../controllers/characterController";

const router = Router();

router.get("/:id", getCharacter as RequestHandler);
router.post("/:id/equip", equipItem as RequestHandler);
router.post("/:id/unequip", unequipItem as RequestHandler);

export default router;
