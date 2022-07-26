import React, { useContext, useRef, useEffect, useState } from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import AnimateTransition from "../common/AnimateTransition";
import { MyContext } from "../contextapi/MyProvider";
import "animate.css";
import { GenerateId } from "../utils/purchase-id";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { collection, addDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import db from "../firebase";
import { uinqId } from "../utils/uniqid";
import { Check, IClose } from "../common/icons/Icons";
const DetailsOverlay = () => {
	const nodeRef = useRef();

	const {
		opendetails,
		setopendetails,
		setopencart,
		setopenpay,
		delverage,
		code,
		setcode,
		setphoneerror,
		setreglocerror,
		setregionerror,
		getproductsinbag,
		setapay,
		totalprice,
		deliveryfee,
		setstoredetails,
		storedetails,
	} = useContext(MyContext);

	const [getregion, setgetregion] = useState([]);
	const [getreglocation, setgetreglocation] = useState([]);

	const [name, setname] = useState("");
	const [phone, setphone] = useState("");
	const [email, setemail] = useState("");
	const [extradetails, setextradetails] = useState("");
	const [orderload, setorderload] = useState(false);
	const [country, setcountry] = useState("");
	const [province, setprovince] = useState("");
	const [town, settown] = useState("");
	const [postalcode, setpostalcode] = useState("");

	useEffect(() => {
		// console.log(localStorage.getItem("storedDetails"));
		if (localStorage.getItem("storedDetails")) {
			setname(
				JSON.parse(localStorage.getItem("storedDetails")).length !== 0
					? JSON.parse(localStorage.getItem("storedDetails"))[0].name
					: ""
			);
			setphone(
				JSON.parse(localStorage.getItem("storedDetails")).length !== 0
					? JSON.parse(localStorage.getItem("storedDetails"))[0].phone
					: ""
			);
			setemail(
				JSON.parse(localStorage.getItem("storedDetails")).length !== 0
					? JSON.parse(localStorage.getItem("storedDetails"))[0].email
					: ""
			);
			setextradetails(
				JSON.parse(localStorage.getItem("storedDetails")).length !== 0
					? JSON.parse(localStorage.getItem("storedDetails"))[0]
							.extradetails
					: ""
			);
			setcountry(
				JSON.parse(localStorage.getItem("storedDetails")).length !== 0
					? JSON.parse(localStorage.getItem("storedDetails"))[0]
							.country
					: ""
			);
			setprovince(
				JSON.parse(localStorage.getItem("storedDetails")).length !== 0
					? JSON.parse(localStorage.getItem("storedDetails"))[0]
							.province
					: ""
			);
			settown(
				JSON.parse(localStorage.getItem("storedDetails")).length !== 0
					? JSON.parse(localStorage.getItem("storedDetails"))[0].town
					: ""
			);
			settown(
				JSON.parse(localStorage.getItem("storedDetails")).length !== 0
					? JSON.parse(localStorage.getItem("storedDetails"))[0]
							.postalcode
					: ""
			);
		}
	}, [opendetails]);

	const ToPay = async () => {
		if (phone === undefined || phone === "") {
			setphoneerror(true);
			setTimeout(() => {
				setphoneerror(false);
			}, 3000);
			return;
		}
		if (delverage.length !== 0) {
			if (getregion === undefined || getregion.length === 0) {
				setregionerror(true);
				setTimeout(() => {
					setregionerror(false);
				}, 3000);
				return;
			}
			if (
				(getregion[0].allLocations.length !== 0 &&
					getreglocation === undefined) ||
				(getregion[0].allLocations.length !== 0 &&
					getreglocation.length === 0)
			) {
				setreglocerror(true);
				setTimeout(() => {
					setreglocerror(false);
				}, 3000);
				return;
			}
		}

		await SendOrder();
	};
	// console.log(code + " " + "uj");

	const SendOrder = async () => {
		try {
			// console.log(new Date());
			setorderload(true);
			const uu = uinqId();
			let ms = Date.now();

			const db = getDatabase();
			await set(ref(db, "orderdetails/" + uu), {
				code: code,
				amount: Number(totalprice + Number(deliveryfee[0].Amount)),
				name: name || "",
				phone: phone || "",
				email: email || "",
				country: country || "",
				province: province || "",
				town: town || "",
				postalcode: postalcode || "",
				extradetails: extradetails || "",
				region: getregion.length !== 0 && getregion[0].regname,
				createdAt: ms,
				isChecked: 0,
				isRead: 0,
				reglocation:
					getreglocation.length !== 0 && getreglocation[0].loc,
				products: [
					...getproductsinbag.map((e) => {
						return {
							id: uinqId(),
							productname: e.data.name,
							count: e.data.count,
							price: e.data.price,
							color:
								e.getacolor.length !== 0 &&
								e.getacolor[0].color,
							size: e.getasize.length !== 0 && e.getasize[0].size,
						};
					}),
				],
			});

			// await set(ref(db, "products/" + uu), {});

			setstoredetails([
				{
					name: name || "",
					phone: phone || "",
					email: email || "",
					country: country || "",
					province: province || "",
					town: town || "",
					postalcode: postalcode || "",
					extradetails: extradetails || "",
					region: getregion.length !== 0 && getregion[0].regname,

					reglocation:
						getreglocation.length !== 0 && getreglocation[0].loc,
				},
			]);

			setname("");
			setphone("");
			setemail("");
			setextradetails("");
			setgetregion([]);
			setgetreglocation([]);
			setcountry("");
			setprovince("");
			settown("");
			setpostalcode("");
			setopendetails(false);
			setorderload(false);
			setTimeout(() => {
				setopenpay(true);
				setapay({
					code: code,
					apay: "yes",
					totalcost: totalprice + Number(deliveryfee[0].Amount),
				});
			}, 400);
		} catch (error) {
			console.log(error);
		}
	};

	const ToCart = () => {
		setopendetails(false);

		setTimeout(() => {
			setopencart(true);
		}, 500);
	};
	const AddRegion = (reg) => {
		// console.log(reg);
		if (getregion.some((e) => e.id === reg.id)) {
			setgetregion([]);
			setgetreglocation([]);

			return;
		}
		setgetregion([reg]);
		const purchId = GenerateId();
		setcode(purchId);
	};
	const AddRegLocation = (regloc) => {
		// console.log(regloc);
		if (getreglocation.some((e) => e.id === regloc.id)) {
			setgetreglocation([]);

			return;
		}
		setgetreglocation([regloc]);
	};

	return (
		<>
			<AnimateTransition
				promptWrapeprClassName="yes"
				timeOut="300"
				EnterAnimate="slideInUp"
				ExitAnimate="slideOutDown"
				detailsError={opendetails}
				nodeRef={nodeRef}>
				<div ref={nodeRef} className="detailsoverlay-wrapper">
					<div className="detailsoverlay-container">
						<div className="detailsoverlay-close-wrapper">
							<button
								onClick={ToCart}
								className="detailsoverlay-close-container">
								<IClose iwidth="22" iheight="22" />
							</button>
						</div>
						<div className="detailsoverlay-content-wrapper">
							<span className="detailsoverlay-header">
								<p>Shopping Address</p>
							</span>
							<div className="detailsoverlay-form">
								<div className="detailsoverlay-name-wrapper">
									<label htmlFor="">
										{" "}
										Name{" "}
										<i style={{ color: "red" }}>
											Optional*
										</i>{" "}
									</label>
									<input
										value={name}
										placeholder="Enter your first name"
										type="text"
										onChange={(e) => {
											setname(e.target.value);
										}}
									/>
								</div>
								<div className="detailsoverlay-name-wrapper">
									<label htmlFor="">Phone Number</label>
									<input
										placeholder="Enter your telephone number"
										type="text"
										name="phone"
										value={phone}
										onChange={(e) => {
											setphone(e.target.value);
										}}
									/>
								</div>

								<div className="detailsoverlay-name-wrapper">
									<label htmlFor="">
										E-mail{" "}
										<i style={{ color: "red" }}>
											{" "}
											Optional*
										</i>{" "}
									</label>
									<input
										placeholder="Enter your email"
										required
										type="email"
										value={email}
										onChange={(e) =>
											setemail(e.target.value)
										}
									/>
								</div>
								{delverage.length === 0 ? (
									<>
										<div className="detailsoverlay-name-wrapper">
											<p
												style={{
													paddingBottom: "15px",
												}}>
												Delivery Address
											</p>

											<label htmlFor=""> Country </label>
											<input
												onChange={(e) =>
													setcountry(e.target.value)
												}
												placeholder="Enter your Country"
												type="text"
												required
												value={country}
											/>
										</div>
										<div className="detailsoverlay-name-wrapper">
											<label htmlFor="">
												{" "}
												Region/State/Province{" "}
											</label>
											<input
												placeholder="Enter your region/state/Province"
												type="text"
												required
												value={province}
												onChange={(e) =>
													setprovince(e.target.value)
												}
											/>
										</div>
										<div className="detailsoverlay-name-wrapper">
											<label htmlFor="">
												{" "}
												City/Town{" "}
											</label>
											<input
												placeholder="Enter your city/town"
												type="text"
												required
												value={town}
												onChange={(e) =>
													settown(e.target.value)
												}
											/>
										</div>
										<div className="detailsoverlay-name-wrapper">
											<label htmlFor="">
												{" "}
												Postal code{" "}
												<i style={{ color: "red" }}>
													Optional*
												</i>{" "}
											</label>
											<input
												placeholder="Enter your postal code"
												type="text"
												required
												value={postalcode}
												onChange={(e) =>
													setpostalcode(
														e.target.value
													)
												}
											/>
										</div>
									</>
								) : (
									""
								)}
								{delverage.length !== 0 ? (
									<div className="detailsoverlay-delivery-wrapper">
										<label htmlFor="">
											Delivery Address
										</label>

										<p className="del-label">
											Choose your region/state/province{" "}
										</p>
										<div className="detailsoverlay-delivery-regions">
											{React.Children.toArray(
												delverage.map((dv) => (
													<span
														key={dv.key}
														className="detailsoverlay-delivery-each-regions">
														<p>{dv.regname}</p>
														<button
															onClick={() =>
																AddRegion(dv)
															}
															className="detailsoverlay-delivery-each-regions-button">
															{getregion ? (
																getregion.some(
																	(e) =>
																		e.id ===
																		dv.id
																) ? (
																	<Check
																		iwidth="18"
																		iheight="18"
																	/>
																) : (
																	""
																)
															) : (
																""
															)}
														</button>
													</span>
												))
											)}
										</div>
										<p className="del-label">
											Choose your town or city{" "}
										</p>

										<div className="detailsoverlay-location-wrapper">
											{getregion.length !== 0
												? // React.Children.toArray(

												  // )
												  getregion[0].allLocations.map(
														(al) => (
															<span
																style={{
																	animationDuration: `${al.animationDuration}`,
																	animationName: `${al.animationName}`,
																}}
																key={al.id}
																className="detailsoverlay-delivery-each-regions">
																<p>{al.loc}</p>
																<button
																	onClick={() =>
																		AddRegLocation(
																			al
																		)
																	}
																	className="detailsoverlay-delivery-each-regions-button">
																	{getreglocation ? (
																		getreglocation.some(
																			(
																				e
																			) =>
																				e.id ===
																				al.id
																		) ? (
																			<Check
																				iwidth="18"
																				iheight="18"
																			/>
																		) : (
																			""
																		)
																	) : (
																		""
																	)}
																</button>
															</span>
														)
												  )
												: ""}
										</div>
									</div>
								) : (
									""
								)}

								<div className="detailsoverlay-name-wrapper">
									<label htmlFor="">
										Extra Details{" "}
										<i style={{ color: "red" }}>
											Optional*
										</i>
									</label>
									<textarea
										name=""
										id=""
										cols="30"
										rows="10"
										value={extradetails}
										onChange={(e) =>
											setextradetails(e.target.value)
										}></textarea>
								</div>
							</div>
						</div>
						<div className="detailsoverlay-checkout-wrapper">
							<button onClick={ToPay}>
								{orderload === false ? (
									<p>Checkout</p>
								) : (
									<p style={{ opacity: "0.5" }}>
										Making order...
									</p>
								)}
							</button>
						</div>
					</div>
				</div>
			</AnimateTransition>
		</>
	);
};

export default DetailsOverlay;

/*
await addDoc(
				collection(db, "allorders"),

				{
					code: code,
					name: name || "",
					phone: phone || "",
					email: email || "",
					country: country || "",
					province: province || "",
					town: town || "",
					postalcode: postalcode || "",
					extradetails: extradetails || "",
					region: getregion.length !== 0 && getregion[0].regname,
					createdAt: new Date(),
					isChecked: 0,
					reglocation:
						getreglocation.length !== 0 && getreglocation[0].loc,
					products: [
						...getproductsinbag.map((e) => {
							return {
								id: uinqId(),
								productname: e.data.name,
								count: e.data.count,
								price: e.data.price,
								color:
									e.getacolor.length !== 0 &&
									e.getacolor[0].color,
								size:
									e.getasize.length !== 0 &&
									e.getasize[0].size,
							};
						}),
					],
				}
			);

		
*/
