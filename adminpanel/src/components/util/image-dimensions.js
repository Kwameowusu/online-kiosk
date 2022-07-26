
export const ImageDimensions = async (e) => {
	let newPromise = new Promise((resolve) => {
		let img = new Image();
		img.src = window.URL.createObjectURL(e.target.files[0]);
		img.onload = () => {
			console.log(img.height);
			console.log(img.width);
			resolve(img);
		
		};
	});

	return newPromise;
};
