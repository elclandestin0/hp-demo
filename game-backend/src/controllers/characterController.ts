import { Request, Response } from "express";
import prisma from "../db/client";

export const getCharacter = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const character = await prisma.character.findUnique({ where: { id } });
    if (!character) return res.status(404).json({ error: "Character not found" });
    res.json(character);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching character" });
  }
};

export const equipItem = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { itemType, itemId } = req.body;
  try {
    const character = await prisma.character.findUnique({ where: { id } });
    if (!character) return res.status(404).json({ error: "Character not found" });

    const equippedItems = { ...(character.equippedItems as Record<string, any>), [itemType]: itemId };
    const updated = await prisma.character.update({
      where: { id },
      data: { equippedItems }
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error equipping item" });
  }
};

export const unequipItem = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { itemType } = req.body;
  try {
    const character = await prisma.character.findUnique({ where: { id } });
    if (!character) return res.status(404).json({ error: "Character not found" });

    const equippedItems = { ...(character.equippedItems as Record<string, any>) };
    delete equippedItems[itemType];
    const updated = await prisma.character.update({
      where: { id },
      data: { equippedItems }
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error unequipping item" });
  }
};
