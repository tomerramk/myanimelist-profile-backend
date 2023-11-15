import { logger } from "./utils/logger.js";
import express from "express";
import cors from "cors";
import animeRoutes from "./routes/anime-routes.js"; // Note the updated import path
import userRoutes from "./routes/user-routes.js";

const app = express();

app.use(cors());

app.use("/api", animeRoutes);
app.use("/api", userRoutes);

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
	logger.debug(`Server listening on port ${PORT}`);
});
