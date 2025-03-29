import { Request, Response } from "express";
import prisma from "../db/client";

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch items." });
  }
};
