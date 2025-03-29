import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import characterRoutes from "./routes/character";
import itemRoutes from "./routes/item";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/character", characterRoutes);
app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
