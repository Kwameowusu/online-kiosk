import { useState, useEffect } from "react";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";
export const UpdateImageWrapper = () => {
	const [nofile, setnofile] = useState(null);
	const [uploadError, setuploadError] = useState();

	const [uploadNumber, setuploadNumber] = useState();
	const [uploadSuccess, setuploadSuccess] = useState(null);
	const [ImgeUrl, setImgUrl] = useState(
		JSON.parse(localStorage.getItem("ImageUrl"))
	);

	useEffect(() => {
		localStorage.setItem("ImageUrl", JSON.stringify(ImgeUrl));
	}, [ImgeUrl]);

	const UpdateImage = (
		e,
		allCompressedImages,
		setallCompressedImages,
		imageDelete,
		filenumber
	) => {
		e.preventDefault();
		if (
			Object.keys(allCompressedImages).length > 1 ||
			Object.keys(allCompressedImages).length === 0
		) {
			setnofile(true);
			const timer = setTimeout(() => {
				setnofile(false);
			}, 5000);
			return () => clearTimeout(timer);
		}
		setuploadNumber(filenumber);
		const deleteProductImages = (productsImagefilename) => {
			const storage = getStorage();

			// Create a reference to the file to delete
			const desertRef = ref(storage, `/uploadt/${productsImagefilename}`);

			// Delete the file
			deleteObject(desertRef)
				.then(() => {
					console.log(" File deleted successfully");
					// File deleted successfully
				})
				.catch((error) => {
					console.log(error);
				});
		};
		
		let p = [];

		Object.values(allCompressedImages).forEach((prof, profIndex) => {
			const storage = getStorage();

			const storageRef1 = ref(storage, "uploadt/" + prof.name);
			const uploadTask1 = uploadBytesResumable(storageRef1, prof);
			uploadTask1.on(
				"state_changed",
				(snapshot) => {
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							// setuploadInProgress("running");
							console.log("Upload is running");
							break;
						default:
							console.log("Upload is paused");
					}
				},
				(error) => {
					console.log(error);
					if (error) {
						setuploadError(true);
						const timer = setTimeout(() => {
							setuploadError(false);
						}, 4000);
						return () => clearTimeout(timer);
					}
				},
				() => {
					getDownloadURL(uploadTask1.snapshot.ref).then(
						(downloadURL) => {
							switch (Number(profIndex)) {
								case 0:
									const afile = (u) => {
										return {
											gurl: downloadURL,
										};
									};
									setImgUrl(afile);
									break;

								default:
							}
							p.push(downloadURL);
							if (p.length === 1) {
								// setuploadInProgress("done");
								setuploadSuccess(true);
								setuploadNumber("");

								setallCompressedImages([]);
								deleteProductImages(imageDelete);
								const timer = setTimeout(() => {
									setuploadSuccess(false);
								}, 5000);
								return () => clearTimeout(timer);
							}
						}
					);
				}
			);
		});
	};
	return [
		nofile,
		uploadSuccess,
		UpdateImage,
		uploadError,
		ImgeUrl,
        setImgUrl,
        uploadNumber
	];
};
