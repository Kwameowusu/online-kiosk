import { useState, useEffect } from "react";
import { average } from "color.js";

export const GetColorWrapper = () => {
	const [filecolor, setfilecolor] = useState(
		JSON.parse(localStorage.getItem("AllImageColors"))
	);
	useEffect(() => {
		localStorage.setItem("AllImageColors", JSON.stringify(filecolor));
	}, [filecolor]);

	const ImageColor = async (e) => {
		let newPromise = new Promise((resolve) => {
			let img = new Image();
			img.src = window.URL.createObjectURL(e.target.files[0]);
			img.onload = () => {
				const getImageCOlors = average(img, {
					amount: 1,
					format: "hex",
				});
				resolve(getImageCOlors);
			};
		});
		return newPromise;
	};

	const GetColor = async (e, fileNumber) => {
		const acolor = await ImageColor(e);
		console.log(acolor);
		switch (fileNumber) {
			case 1:
				const file1 = (p) => {
					return {
						...p,
						cl1: acolor,
					};
				};
				setfilecolor(file1);
				break;
			case 2:
				const file2 = (p) => {
					return {
						...p,
						cl2: acolor,
					};
				};
				setfilecolor(file2);
				break;
			case 3:
				const file3 = (p) => {
					return {
						...p,
						cl3: acolor,
					};
				};
				setfilecolor(file3);
				break;
			case 4:
				const file4 = (p) => {
					return {
						...p,
						cl4: acolor,
					};
				};
				setfilecolor(file4);
				break;
		
			default:
		}
	};

	return [GetColor, filecolor];
};
