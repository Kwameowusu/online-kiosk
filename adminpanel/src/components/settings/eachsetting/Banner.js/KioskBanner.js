import React, { useState, useEffect, useContext } from "react";
import Loader from "../../../common/Loader";
import { ImageRename } from "../../../util/image-rename";
import imageCompression from "browser-image-compression";
import { GetColorWrapper } from "../../../util/image-color";
import { ImageDimensions } from "../../../util/image-dimensions";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";

import { collection, addDoc } from "firebase/firestore";
import db from "../../../../firebase";
import {
	AlertPlate,
	ErrorPlate,
	SuccessPlate,
} from "../../../common/ErrorPlate";
import { MyContext } from "../../../../contextapi/MyProvider";
import { useDeleteSomething } from "../../../util/delete-something";
import CoverPhoto from "./CoverPhoto";
import { IClose } from "../../../common/icons/Icons";
import KioskLogo from "./KioskLogo";
const KioskBanner = () => {
	const { kioskbanner, setkioskbanner, fetchKioskBanner, fetchCover } =
		useContext(MyContext);
	const [banner, setbanner] = useState(null);
	const [bannername, setbannername] = useState(
		JSON.parse(localStorage.getItem("bannername"))
	);

	useEffect(() => {
		localStorage.setItem("bannername", JSON.stringify(bannername));
	}, [bannername]);
	const [nofile, setnofile] = useState(null);
	const [banneronload, setbanneronload] = useState(false);
	const [banneronload1, setbanneronload1] = useState(false);
	const [banneronload2, setbanneronload2] = useState(false);

	const [imageDimensionPrompt, setimageDimensionPrompt] = useState(null);
	const [uploadError, setuploadError] = useState(null);
	const [emptyvalue, setemptyvalue] = useState(null);
	// const [uploadInProgress, setuploadInProgress] = useState();
	const [GetColor, filecolor] = GetColorWrapper();
	const [imageurl, setimageurl] = useState(
		JSON.parse(localStorage.getItem("bannerurl"))
	);

	useEffect(() => {
		localStorage.setItem("bannerurl", JSON.stringify(imageurl));
	}, [imageurl]);

	const [uploadSuccess, setuploadSuccess] = useState(null);
	const [deleteDetails] = useDeleteSomething();

	const [delonload, setdelonload] = useState(false);

	const BannerOnChange = async (e) => {
		e.preventDefault();
		setbanneronload(true);
		const reqImage = await ImageDimensions(e);
		if (reqImage.height < 600 || reqImage.width < 600) {
			setimageDimensionPrompt(true);
			setbanneronload(false);

			const timer = setTimeout(() => {
				setimageDimensionPrompt(false);
			}, 3000);
			return () => clearTimeout(timer);
		}

		await GetColor(e, 1);

		const renamedImage = await ImageRename(e.target.files[0]);

		const options = {
			maxSizeMB: 5,
			maxWidthOrHeight: 600,
			useWebWorker: true,
		};

		try {
			const AcompressedFile = await imageCompression(
				renamedImage,
				options
			);
			console.log(AcompressedFile);
			setbanner({
				comf1: AcompressedFile,
			});
			setbannername({
				cf1: AcompressedFile.name,
			});
		} catch (error) {
			console.log(error);
		}
		setbanneronload(false);
	};

	const BannerSubmit = (e) => {
		e.preventDefault();
		const storage = getStorage();
		console.log(banner.comf1);

		if (
			banner.comf1 === null ||
			banner.comf1 === undefined ||
			Object.keys(banner).length !== 1
		) {
			setnofile(true);
			setTimeout(() => {
				setnofile(false);
			}, 800);
		}
		const storageRef1 = ref(storage, "banner/" + banner.comf1.name);
		const uploadTask1 = uploadBytesResumable(storageRef1, banner.comf1);
		uploadTask1.on(
			"state_changed",
			(snapshot) => {
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						setbanneronload1(true);

						console.log("Upload is running");
						break;
					default:
						console.log("Upload is paused");
				}
			},

			(error) => {
				console.log(error);
				setbanneronload1(false);

				if (error) {
					setuploadError(true);
					const timer = setTimeout(() => {
						setuploadError(false);
					}, 4000);
					return () => clearTimeout(timer);
				}
			},
			() => {
				getDownloadURL(uploadTask1.snapshot.ref).then((downloadUrl) => {
					console.log(downloadUrl);
					setimageurl({
						url: downloadUrl,
					});
					setbanneronload1(false);

					setuploadSuccess(true);
					const timer = setTimeout(() => {
						setuploadSuccess(false);
					}, 5000);
					return () => clearTimeout(timer);
				});
			}
		);
	};
	const SubmitBannerDetails = async () => {
		try {
			if (imageurl === null || Object.keys(imageurl).length !== 1) {
				setemptyvalue(true);
				setTimeout(() => {
					setemptyvalue(false);
					setbanneronload2(false);
				}, 4000);
				return;
			}
			setbanneronload2(true);

			await addDoc(collection(db, "kioskbanner"), {
				kioskBanner: {
					filename: bannername.cf1,
					url: imageurl.url,
					color: filecolor.cl1,
				},
			});
			// setkioskbanner((prev) => [
			// 	...prev,
			// 	{
			// 		kioskCover: {
			// 			filename: bannername.cf1,
			// 			url: imageurl.url,
			// 			color: filecolor.cl1,
			// 		},
			// 	},
			// ]);
			setimageurl(null);
			setbannername(null);
			setbanneronload2(false);
			localStorage.setItem("AllImageColors", null);
			fetchKioskBanner();
		} catch (error) {
			setbanneronload2(false);
		}
	};

	const ShowDelete = (id) => {
		// console.log(id);
		const mm = kioskbanner.map((b) => {
			if (b.banid === id) {
				b.isChecked = !b.isChecked;
			}
			return b;
		});

		setkioskbanner(mm);
	};

	// const DeleteBanner = () => {};

	return (
		<>
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}>
				<SuccessPlate
					timeOut="750"
					EnterAnimate="BounceIn"
					ExitAnimate="BounceOut"
					detailsError={uploadSuccess}
					SucMessage="Banner uoload success"
				/>

				<ErrorPlate
					promptClassName="errorplate-container"
					timeOut="750"
					EnterAnimate="BounceIn"
					ExitAnimate="BounceOut"
					detailsError={nofile}
					ErrMessage="Oops no file found"
				/>
				<ErrorPlate
					promptClassName="errorplate-container"
					timeOut="750"
					EnterAnimate="BounceIn"
					ExitAnimate="BounceOut"
					detailsError={emptyvalue}
					ErrMessage="Please upload banner"
				/>
				<ErrorPlate
					promptClassName="errorplate-container"
					timeOut="750"
					EnterAnimate="BounceIn"
					ExitAnimate="BounceOut"
					detailsError={imageDimensionPrompt}
					ErrMessage="Image is too small for a banner"
				/>

				<ErrorPlate
					promptClassName="errorplate-container"
					timeOut="750"
					EnterAnimate="BounceIn"
					ExitAnimate="BounceOut"
					detailsError={uploadError}
					ErrMessage="Oops file upload error"
				/>
				<AlertPlate
					// promptClassName="alertplate-container"
					timeOut="750"
					EnterAnimate="SlideInDown"
					ExitAnimate="SlideOutUp"
					// detailsError={uploadSuccess}
					// SucMessage="file upload success"
					bannerUrl={imageurl}
					setbannerUrl={setimageurl}
					setbannername={setbannername}
					compressedFile={bannername}
					folder="banner"
				/>
			</div>

			<div className="deliverycoverage-wrapper">
				<div className="deliverycoverage-header-wrapper">
					<p className="deliverycoverage-header-text">
						Upload banners and cover image
					</p>
					<p
						onClick={() => {
							fetchCover();
							fetchKioskBanner();
						}}
						className="reload-data">
						refetch
					</p>
				</div>
				<div className="deliverage-add-region-wrapper">
					<form
						className="kioskbanner-wrapper"
						onSubmit={BannerSubmit}>
						<div
							style={{
								width: "100%",
								opacity: imageurl
									? Object.keys(imageurl).length === 1
										? "0.2"
										: "0.8"
									: 0.8,
							}}
							className="addproduct-input-image-wrapper">
							<div className="addproduct-input-image-container">
								{banneronload === true ? (
									<div
										style={{
											width: "100%",
											height: "25px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											opacity: "0.8",
										}}>
										<Loader cwidth="14px" cheight="14px" />
									</div>
								) : bannername !== null ? (
									<label htmlFor="">{bannername.cf1}</label>
								) : (
									<label htmlFor="file">
										Upload kiosk banners
									</label>
								)}
							</div>
							<input
								onChange={(e) => BannerOnChange(e)}
								onClick={({ target }) => {
									target.value = null;
								}}
								type="file"
								name="file"
								required
								id=""
							/>
						</div>
						<button type="submit">
							{banneronload1 === false ? (
								<p>Upload banner</p>
							) : (
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										width: "100%",
										height: "100%",
										overflow: "hidden",
									}}>
									<Loader cwidth="12px" cheight="12px" />
								</div>
							)}
						</button>
					</form>
				</div>
				<div className="kioskbanner-upload-details">
					<button onClick={SubmitBannerDetails} type="submit">
						{banneronload2 === false ? (
							<p>Upload banner details</p>
						) : (
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: "100%",
									height: "100%",
									overflow: "hidden",
								}}>
								<Loader cwidth="12px" cheight="12px" />
							</div>
						)}
					</button>
				</div>
				<div className="kioskbanner-upload-all-banners-wrapper">
					{kioskbanner.map((b) => (
						<div
							className="kioskbanner-each-upload-wrapper"
							key={b.kioskBanner.url}>
							<button
								onClick={() => ShowDelete(b.banid)}
								className="kioskbanner-each-upload-button">
								<IClose
									iwidth='14'
									iheight="14"
								/>
							</button>
							<div
								style={{
									backgroundColor: `${b.kioskBanner.color}`,
								}}
								className="kioskbanner-each-upload-container">
								{b.isChecked ? (
									<div className="kioskbanner-each-upload-cover">
										<button
											onClick={() =>
												deleteDetails(
													b.banid,
													"",
													{
														filename:
															b.kioskBanner
																.filename,
													},
													setdelonload,
													"",
													"kioskbanner",
													"banner"
												)
											}>
											{delonload === false ? (
												<p> delete</p>
											) : (
												<div
													style={{
														display: "flex",
														alignItems: "center",
														justifyContent:
															"center",
														width: "100%",
														height: "100%",
														overflow: "hidden",
													}}>
													<Loader
														cwidth="10px"
														cheight="10px"
													/>
												</div>
											)}
										</button>
									</div>
								) : (
									""
								)}
								<img
									onError={(e) =>
										(e.target.style.display = "none")
									}
									src={b.kioskBanner.url}
									alt=""
								/>
							</div>
						</div>
					))}
				</div>
				<CoverPhoto />
				<KioskLogo/>
			</div>
		</>
	);
};

export default KioskBanner;
