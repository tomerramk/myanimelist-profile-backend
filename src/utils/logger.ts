import winston, { Logger } from "winston";

function replaceErrors(key: string, value: any) {
	if (value instanceof Error) {
		const error: Error = {
			...value,
			name: value.name,
			message: value.message,
			stack: value.stack,
		};
		return error;
	}
	return value;
}

const format: winston.Logform.Format =
	process.env.NODE_ENV === "production"
		? winston.format.json({ replacer: replaceErrors })
		: winston.format.prettyPrint();

export const logger: Logger = winston.createLogger({
	level: "debug",
	format: winston.format.combine(format),
	transports: [new winston.transports.Console()],
});

export default logger;
