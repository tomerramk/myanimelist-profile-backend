import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();

router.use(express.json());

router.get("/anime/:id", async (req: Request, res: Response) => {
	const id = req.params.id;

	try {
		const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
		res.json(response.data);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

export default router;
