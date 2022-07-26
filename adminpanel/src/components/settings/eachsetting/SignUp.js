import React, { useEffect, useState } from "react";
import {
	getAuth,
	signOut,
	updateProfile,
	updateEmail,
	updatePassword,
} from "firebase/auth";
import Loader from "../../common/Loader";
import { ImageRename } from "../../util/image-rename";
import imageCompression from "browser-image-compression";

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";

// import { collection, addDoc } from "firebase/firestore";
// import db from "../../../firebase";
import { AlertPlate, ErrorPlate, SuccessPlate } from "../../common/ErrorPlate";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
	const auth = getAuth();

	// const { kioskbanner, setkioskbanner } = useContext(MyContext);
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

	const [uploadError, setuploadError] = useState(null);
	const [emptyvalue, setemptyvalue] = useState(null);

	const [imageurl, setimageurl] = useState(
		JSON.parse(localStorage.getItem("bannerurl"))
	);

	useEffect(() => {
		localStorage.setItem("bannerurl", JSON.stringify(imageurl));
	}, [imageurl]);

	const [uploadSuccess, setuploadSuccess] = useState(null);
	// const [deleteDetails] = useDeleteSomething();

	// const [delonload, setdelonload] = useState(false);
	const [takepassword, settakepassword] = useState();
	const [passonload, setpassonload] = useState(false);
	const [takeemail, settakeemail] = useState("");
	const [emailonload, setemailonload] = useState(false);
	const [takename, settakename] = useState("");
	const navigate = useNavigate();

	const LogOut = async () => {
		localStorage.removeItem('admindetails');
		localStorage.removeItem('token')
	navigate('/login')
		await signOut(auth);
	};
	const BannerOnChange = async (e) => {
		e.preventDefault();
		setbanneronload(true);

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
	const UploadProfile = (e) => {
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
		const storageRef1 = ref(storage, "profile/" + banner.comf1.name);
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
	const UpdateProfile = (e) => {
		e.preventDefault();

		if (imageurl === null || Object.keys(imageurl).length !== 1) {
			setemptyvalue(true);
			setTimeout(() => {
				setemptyvalue(false);
				setbanneronload2(false);
			}, 4000);
			return;
		}
		setbanneronload2(true);
		updateProfile(auth.currentUser, {
			displayName: takename,
			photoURL: imageurl.url,
		})
			.then(() => {
				setimageurl(null);
				setbannername(null);
				localStorage.setItem("AllImageColors", null);
				setbanneronload2(false);
				settakename("");
			})
			.catch((error) => {
				setbanneronload2(false);
			});
	};
	const UpdateEmail = async (e) => {
		e.preventDefault();
		console.log(takeemail);
		if (takeemail) {
			setemailonload(true);
			updateEmail(auth.currentUser, takeemail)
				.then(async () => {
					setemailonload(false);
					// Email updated!
					// ...
					settakeemail("");
					localStorage.clear();
					document.location.href = "/";
					await signOut(auth);
				})
				.catch((error) => {
					console.log(error);
					setemailonload(false);

					// An error occurred
					// ...
				});
		}
	};

	const UpdatePassword = async (e) => {
		e.preventDefault();

		if (takepassword) {
			setpassonload(true);
			updatePassword(auth.currentUser, takepassword)
				.then(async () => {
					setpassonload(false);
					// Email updated!
					// ...
					settakepassword("");
					localStorage.clear();
					document.location.href = "/";
					await signOut(auth);
				})
				.catch((error) => {
					console.log(error);
					setpassonload(false);

					// An error occurred
					// ...
				});
		}
	};
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
					folder="profile"
				/>
			</div>

			<div className="deliverycoverage-wrapper">
				<div className="deliverycoverage-header-wrapper">
					<p className="deliverycoverage-header-text">
						Update Login Details
					</p>
					<span className="sign-out-wrapper">
						<button onClick={LogOut}>
							<p>Sign out</p>
						</button>
					</span>
				</div>
				<div className="deliverage-add-region-wrapper">
					<form
						className="kioskbanner-wrapper"
						onSubmit={UploadProfile}>
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
										Upload admin profile
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
								<p>Upload</p>
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
					<form
						onSubmit={UpdateProfile}
						className="kioskbanner-upload-details">
						<input
							type="text"
							name=""
							id=""
							placeholder="Update username"
							onChange={(e) => settakename(e.target.value)}
							value={takename}
							required

						/>

						<button type="submit">
							{banneronload2 === false ? (
								<p>Upload profile details</p>
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

					<form
						onSubmit={UpdateEmail}
						action="
                    ">
						<input
							type="text"
							required
							name=""
							id=""
							placeholder="Enter email"
							onChange={(e) => settakeemail(e.target.value)}
						/>
						<button type="submit">
							{emailonload === false ? (
								<p>Submit</p>
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

					<form onSubmit={UpdatePassword}>
						<input
							required
							
							type="text"
							name=""
							id=""
							placeholder="Enter password"
							onChange={(e) => settakepassword(e.target.value)}
						/>
						<button type="submit">
							{passonload === false ? (
								<p>Submit</p>
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
			</div>
		</>
	);
};

export default SignUp;
