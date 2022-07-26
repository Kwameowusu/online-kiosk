import React, { useState, forwardRef, useRef, useEffect } from "react";
import AnimateTransition from "./AnimateTransition";
import { getStorage, ref, deleteObject } from "firebase/storage";
import Loader from "./Loader";
import { Exclamation } from "./icons/Icons";
export const SuccessPlate = forwardRef(
	({ EnterAnimate, ExitAnimate, detailsError, timeOut, SucMessage }, ref) => {
		const aRef = useRef();
		return (
			<>
				<AnimateTransition
					EnterAnimate={EnterAnimate}
					ExitAnimate={ExitAnimate}
					detailsError={detailsError}
					timeOut={timeOut}
					nodeRef={aRef}>
					<div ref={aRef} className="successplate-container">
						<span>
							<i className="fa">🎉</i>
							<p>{SucMessage}</p>
						</span>
					</div>
				</AnimateTransition>
			</>
		);
	}
);

export const AlertPlate = ({
	EnterAnimate,
	ExitAnimate,
	timeOut,
	ImageUrl,
	setImgUrl,
	compressedFile,
	bannerUrl,
	setbannerUrl,
	setbannername,
	folder
}) => {
	const aRef = useRef();
	const [ondata, setondata] = useState(null);
	const [del, setdel] = useState(false);

	const deleteProductImages = () => {
		Object.values(compressedFile).forEach((p) => {
			setdel(true);

			const storage = getStorage();
			if (bannerUrl) {
				const banRef = ref(storage, `/${folder}/${p}`);
				deleteObject(banRef)
					.then(() => {
						console.log(" banner deleted successfully");
						// localStorage.setItem("AllImageUrl", JSON.stringify(null));
						setbannerUrl(null);
						setbannername(null);
						setdel(false);
					})
					.catch((error) => {
						console.log(error);
					});
				return;
			}
			// Create a reference to the file to delete
			const desertRef = ref(storage, `/uploadt/${p}`);

			// Delete the file
			deleteObject(desertRef)
				.then(() => {
					console.log(" File deleted successfully");
					// localStorage.setItem("AllImageUrl", JSON.stringify(null));

					setImgUrl(null);
					setdel(false);
				})
				.catch((error) => {
					console.log(error);
			setdel(false);

				});
		});
	};

	useEffect(() => {
		if (bannerUrl === null || bannerUrl === undefined) {
			setondata(false);
			return;
		}

		if (Object.keys(bannerUrl).length === 1) {
			setTimeout(() => {
				setondata(true);
			}, 1000);
		}
	}, [bannerUrl]);

	useEffect(() => {
		// console.log(ImageUrl);
		if (ImageUrl === null || ImageUrl === undefined) {
			setondata(false);
			return;
		}
		if (Object.keys(ImageUrl).length === 4) {
			setTimeout(() => {
				setondata(true);
			}, 1000);
		}
	}, [ImageUrl]);
	return (
		<>
			<AnimateTransition
				EnterAnimate={EnterAnimate}
				ExitAnimate={ExitAnimate}
				detailsError={ondata}
				timeOut={timeOut}
				nodeRef={aRef}>
				<div ref={aRef} className="alertplate-container">
					<span className="warning">
					<Exclamation iheight='70' iwidth='70'/>
						<p>
							You have product image(s) uploaded on the cloud
							already.
							<br />
							Add the product data and continue
						</p>
					</span>
					<span className="alertplate-button">
						<button onClick={deleteProductImages} type="submit">
							{del === false ? (
								del
							) : (
								<div
									style={{
										width: "80%",
										height: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}>
									<Loader cwidth="12px" cheight="12px" />
								</div>
							)}
							delete
						</button>
					</span>
				</div>
			</AnimateTransition>
		</>
	);
};

export const ErrorPlate = ({
	promptClassName,
	EnterAnimate,
	ExitAnimate,
	detailsError,
	timeOut,
	ErrMessage,
}) => {
	const nodeRef = useRef();
	return (
		<>
			<AnimateTransition
				promptClassName={promptClassName}
				EnterAnimate={EnterAnimate}
				ExitAnimate={ExitAnimate}
				detailsError={detailsError}
				timeOut={timeOut}
				nodeRef={nodeRef}>
				<div ref={nodeRef} className={`${promptClassName}`}>
					<span>
					<Exclamation  iheight='50' iwidth='50' />
						<p>{ErrMessage}</p>
					</span>
				</div>
			</AnimateTransition>
		</>
	);
};

export const NetworkPlate = ({
	promptClassName,
	EnterAnimate,
	ExitAnimate,
	detailsError,
	timeOut,
}) => {
	const nodeRef = useRef();
	return (
		<>
			<AnimateTransition
				promptClassName={promptClassName}
				EnterAnimate={EnterAnimate}
				ExitAnimate={ExitAnimate}
				detailsError={detailsError}
				timeOut={timeOut}
				nodeRef={nodeRef}>
				<div ref={nodeRef} className={`${promptClassName}`}>
					<span>
					<Exclamation iheight='30' iwidth='30'/>
						<p>Connect to the internet</p>
					</span>
				</div>
			</AnimateTransition>
		</>
	);
};
