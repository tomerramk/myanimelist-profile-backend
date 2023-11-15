import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();

router.use(express.json());

router.get("/users/:username", async (req: Request, res: Response) => {
	const username = req.params.username;

	try {
		const response = await axios.get(
			`https://api.jikan.moe/v4/users/${username}/full`,
		);
		res.json(response.data);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

router.get(
	"/users/animelist/:username",
	async (req: Request, res: Response) => {
		const username = req.params.username;
		const page = req.query.page ? parseInt(req.query.page as string) : 1;
		const limit = 25;

		try {
			const response = await axios.get(
				`https://api.myanimelist.net/v2/users/${username}/animelist`,
				{
					headers: { "X-MAL-CLIENT-ID": "14d56d1593e4ef012169f1c095749f1c" },
					params: {
						fields: "list_status",
						limit: limit,
						offset: (page - 1) * limit,
					},
				},
			);

			const animeCards = response.data.data.map((item) => ({
				id: item.node.id,
				title: item.node.title,
				main_picture: item.node.main_picture,
				status: item.list_status.status,
				score: item.list_status.score,
				num_episodes_watched: item.list_status.num_episodes_watched,
				is_rewatching: item.list_status.is_rewatching,
				updated_at: item.list_status.updated_at,
				finish_date: item.list_status.finish_date,
			}));

			res.json({
				data: animeCards,
				nextPage: page + 1,
			});
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" });
		}
	},
);

export default router;
