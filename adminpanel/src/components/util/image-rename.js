
// import { prominent } from "color.js";

export const ImageRename = async (imageFile) => {
	let newPromise = new Promise((resolve) => {
		const oldFile = new File([imageFile], imageFile.name, {});
		const newfile = new File([oldFile], `Online-kiosk-${Date.now()}.png`, {
			type: "image/jpg",
		});
		resolve(newfile);
	});
	return newPromise;
};
