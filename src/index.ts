import logger from "./utils/logger";
import express from "express";
import cors from "cors";
import animeRoutes from "./routes/anime-routes"; // Note the updated import path
import userRoutes from "./routes/user-routes";

const app = express();

app.use(cors());

app.use("/api", animeRoutes);
app.use("/api", userRoutes);

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
	logger.debug(`Server listening on port ${PORT}`);
});
