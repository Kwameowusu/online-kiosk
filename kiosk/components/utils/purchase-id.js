export const GenerateId = () => {
	const digits = "0123456789";

	let weekday = ["S", "M", "T", "W", "H", "F", "A"][new Date().getDay()];
	let code = weekday;

	for (let index = 0; index < 4; index++) {
		code += digits[Math.floor(Math.random() * 10)];
	}

	return code;
};
