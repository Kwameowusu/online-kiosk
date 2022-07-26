import { useState, useEffect } from "react";
import { ImageRename } from "./image-rename.js";
import imageCompression from "browser-image-compression";
import { ImageDimensions } from "./image-dimensions.js";
import { GetColorWrapper } from "./image-color.js";

export const EachOnChange = () => {
	const [anupload, setanupload] = useState("");
	const [compressedFile, setcompressedFile] = useState(
		JSON.parse(localStorage.getItem("AllImageNames"))
	);

	const [imageDimensionPrompt, setimageDimensionPrompt] = useState(false);
	const [allCompressedImages, setallCompressedImages] = useState([]);

	useEffect(() => {
		localStorage.setItem("AllImageNames", JSON.stringify(compressedFile));
	}, [compressedFile]);

	const [GetColor, filecolor] = GetColorWrapper();

	const OnChange = async (e, fileNumber) => {
		setanupload(fileNumber);

		if (Number(fileNumber) === 4) {
			const reqImage = await ImageDimensions(e);
			if (reqImage.height < 900 || reqImage.width < 900) {
				setanupload("");
				setimageDimensionPrompt(!imageDimensionPrompt);

				const timer = setTimeout(() => {
					setimageDimensionPrompt(imageDimensionPrompt);
				}, 3000);
				return () => clearTimeout(timer);
			}
		}

		await GetColor(e, fileNumber);

		const renamedImage = await ImageRename(e.target.files[0]);

		const options = {
			maxSizeMB: 5,
			maxWidthOrHeight: 400,
			useWebWorker: true,
		};
		try {
			const AcompressedFile = await imageCompression(
				renamedImage,
				options
			);
			// setallCompressedImages((pro) => [...pro, AcompressedFile]);

			switch (fileNumber) {
				case 1:
					const file1 = (p) => {
						return {
							...p,
							cf1: AcompressedFile.name,
						};
					};
					const comp1 = (p) => {
						return {
							...p,
							compf1: AcompressedFile,
						};
					};
					setallCompressedImages(comp1);
					setcompressedFile(file1);
					break;
				case 2:
					const file2 = (p) => {
						return {
							...p,
							cf2: AcompressedFile.name,
						};
					};
					const comp2 = (p) => {
						return {
							...p,
							compf2: AcompressedFile,
						};
					};
					setallCompressedImages(comp2);
					setcompressedFile(file2);
					break;
				case 3:
					const file3 = (p) => {
						return {
							...p,
							cf3: AcompressedFile.name,
						};
					};
					const comp3 = (p) => {
						return {
							...p,
							compf3: AcompressedFile,
						};
					};
					setallCompressedImages(comp3);
					setcompressedFile(file3);
					break;
				case 4:
					const file4 = (p) => {
						return {
							...p,
							cf4: AcompressedFile.name,
						};
					};
					const comp4 = (p) => {
						return {
							...p,
							compf4: AcompressedFile,
						};
					};
					setallCompressedImages(comp4);
					setcompressedFile(file4);
					break;
				default:
			}
		} catch (error) {
			console.log(error);
		}
		setanupload("");
	};

	return [
		imageDimensionPrompt,
		allCompressedImages,
		setallCompressedImages,
		OnChange,
		anupload,
		compressedFile,
		filecolor,
	];
};
