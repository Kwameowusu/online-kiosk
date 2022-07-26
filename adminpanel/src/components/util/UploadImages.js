import { useState, useEffect } from "react";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
// import { collection, addDoc } from "firebase/firestore";
// import db from "../../firebase";

const UploadImages = () => {
	const [nofile, setnofile] = useState(null);
	const [uploadError, setuploadError] = useState();
	const [uploadInProgress, setuploadInProgress] = useState("done");
	const [uploadSuccess, setuploadSuccess] = useState(null);
	const [ImgeUrl, setImgUrl] = useState(
		JSON.parse(localStorage.getItem("AllImageUrl"))
	);

	useEffect(() => {
		localStorage.setItem("AllImageUrl", JSON.stringify(ImgeUrl));
	}, [ImgeUrl]);

	const SubmitAllFile = (e, allCompressedImages, setallCompressedImages) => {
		e.preventDefault();


		if (Object.keys(allCompressedImages).length !== 4) {
			setnofile(true);
			const timer = setTimeout(() => {
				setnofile(false);
			}, 5000);
			return () => clearTimeout(timer);
		}
		let u = [];
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
							setuploadInProgress("running");
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
							// setImgUrl((pro) => [...pro, downloadURL]);

							switch (Number(profIndex)) {
								case 0:
									const file1 = (u) => {
										return {
											...u,
											url1: downloadURL,
										};
									};
									setImgUrl(file1);
									break;
								case 1:
									const file2 = (u) => {
										return {
											...u,
											url2: downloadURL,
										};
									};
									setImgUrl(file2);
									break;
								case 2:
									const file3 = (u) => {
										return {
											...u,
											url3: downloadURL,
										};
									};
									setImgUrl(file3);
									break;
								case 3:
									const file4 = (u) => {
										return {
											...u,
											url4: downloadURL,
										};
									};
									setImgUrl(file4);
									break;
								default:
							}
							u.push(downloadURL);
							
							if (u.length === 4) {
								setuploadInProgress("done");
								setuploadSuccess(true);
								setallCompressedImages([]);

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
		uploadInProgress,
		SubmitAllFile,
		uploadError,
		ImgeUrl,
		setImgUrl,
	];
};

export default UploadImages;
