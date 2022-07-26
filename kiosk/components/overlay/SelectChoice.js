import React, { useContext, useRef, useState, useEffect } from "react";
import AnimateTransition from "../common/AnimateTransition";
// import { ErrorPlate } from "../common/PromptPlate";
import { MyContext } from "../contextapi/MyProvider";
import { uinqId } from "../utils/uniqid";
import { useRouter } from "next/dist/client/router";
import { Check, IClose, ShopWhat } from "../common/icons/Icons";
const SelectChoice = ({ editclose, seteditclose, data }) => {
	const nodeRef = useRef();
	const targetnode = useRef();
	const addnode = useRef();
	const [pageurl, setpageurl] = useState("");

	const {
		getsize,
		setgetsize,
		getcolor,
		setgetcolor,
		PutProductInBag,
		setopencart,
		setaddproducterror,
		getproductsinbag,
		setgetproductsinbag,
		setcheckcartempty,
		setstockover1,
	} = useContext(MyContext);

	const apath = useRouter().asPath;

	// console.log(apath);
	const GetSizeFunc = (size) => {
		if (getsize.some((e) => e.id === size.id)) {
			setgetsize([]);

			return;
		}
		// console.log(size);
		setgetsize([size]);
	};

	const GetColorFunc = (color) => {
		if (getcolor.some((e) => e.id === color.id)) {
			console.log("k");
			setgetcolor([]);

			return;
		}
		setgetcolor([color]);
	};

	const PutProductInBag1 = (e, id) => {
		const newBagItem1 = getproductsinbag.find(
			(pro) =>
				(pro.data.id === id &&
					pro.getasize.length !== 0 &&
					getsize.length !== 0 &&
					pro.getasize[0].size === getsize[0].size &&
					pro.getacolor.length !== 0 &&
					getcolor.length !== 0 &&
					pro.getacolor[0].color === getcolor[0].color) ||
				(pro.data.id === id &&
					pro.getasize.length === 0 &&
					pro.getacolor.length !== 0 &&
					getcolor.length !== 0 &&
					pro.getacolor[0].color === getcolor[0].color) ||
				(pro.data.id === id &&
					pro.getacolor.length === 0 &&
					pro.getasize.length !== 0 &&
					getsize.length !== 0 &&
					pro.getasize[0].size === getsize[0].size)
		);

		if (newBagItem1 !== undefined) {
			const gg = getproductsinbag.map((n) => {
				if (
					(n.data.id === newBagItem1.data.id &&
						n.getasize.length === newBagItem1.getasize.length &&
						n.getasize.length !== 0 &&
						n.getasize[0].size === newBagItem1.getasize[0].size &&
						n.getacolor.length !== 0 &&
						n.getacolor.length === newBagItem1.getacolor.length &&
						n.getacolor[0].color ===
							newBagItem1.getacolor[0].color) ||
					(n.data.id === newBagItem1.data.id &&
						n.getasize.length === newBagItem1.getasize.length &&
						n.getacolor.length === newBagItem1.getacolor.length &&
						n.getacolor.length !== 0 &&
						n.getacolor[0].color ===
							newBagItem1.getacolor[0].color) ||
					(n.data.id === newBagItem1.data.id &&
						n.getacolor.length === newBagItem1.getacolor.length &&
						n.getasize.length === newBagItem1.getasize.length &&
						n.getasize.length !== 0 &&
						n.getasize[0].size === newBagItem1.getasize[0].size)
				) {
					n.data.count = n.data.count + 1;
					n.data.price = n.data.oldprice * n.data.count;
				}
				return n;
			});
			setgetproductsinbag(gg);
			return;
		}

		if (data.pickcolor.length !== 0 && data.picksize.length !== 0) {
			if (getcolor.length === 0 || getsize.length === 0) {
				setaddproducterror(true);
				setTimeout(() => {
					setaddproducterror(false);
				}, 3000);
				return;
			}

			ClearaProduct(e);
			setTimeout(() => {
				setopencart(true);
			}, 500);
			PutProductInBag(getcolor, getsize, data, uinqId());
			setcheckcartempty(false);
		} else if (data.picksize.length !== 0) {
			if (getsize.length === 0) {
				setaddproducterror(true);
				setTimeout(() => {
					setaddproducterror(false);
				}, 3000);
				return;
			}

			ClearaProduct(e);
			setTimeout(() => {
				setopencart(true);
			}, 500);
			PutProductInBag(getcolor, getsize, data, uinqId());
			setcheckcartempty(false);
		} else if (data.pickcolor.length !== 0) {
			if (getcolor.length === 0) {
				setaddproducterror(true);
				setTimeout(() => {
					setaddproducterror(false);
				}, 3000);
				return;
			}
			ClearaProduct(e);
			setTimeout(() => {
				setopencart(true);
			}, 500);
			PutProductInBag(getcolor, getsize, data, uinqId());
			setcheckcartempty(false);
		} else if (data.pickcolor.length !== 0 && data.picksize.length !== 0) {
			if (getcolor.length !== 0 || getsize.length !== 0) {
				ClearaProduct({ target });
				setTimeout(() => {
					setopencart(true);
				}, 500);

				PutProductInBag(getcolor, getsize, data, uinqId());
				setcheckcartempty(false);
			}
		}
	};
	const ClearaProduct = ({ target }) => {
		if (
			target === nodeRef.current ||
			target === targetnode.current ||
			target === targetnode.current.childNodes[0]
		) {
			setgetcolor([]);
			setgetsize([]);
			seteditclose(false);
		}

		if (data.pickcolor.length !== 0 && data.picksize.length !== 0) {
			if (getsize.length === 0) return;
			if (getcolor.length === 0) return;
		}
		if (data.pickcolor.length === 0 && data.picksize.length !== 0) {
			if (getsize.length === 0) return;
		}
		if (data.pickcolor.length !== 0 && data.picksize.length === 0) {
			if (getcolor.length === 0) return;
		}

		if (
			target === addnode.current ||
			target === addnode.current.childNodes[0]
		) {
			setgetcolor([]);
			setgetsize([]);

			seteditclose(false);
		}
	};

	useEffect(() => {
		setpageurl(window.location.href);
	}, []);

	return (
		<>
			<AnimateTransition
				promptWrapeprClassName="yes"
				timeOut="300"
				EnterAnimate="slideInUp"
				ExitAnimate="slideOutDown"
				detailsError={editclose}
				nodeRef={nodeRef}>
				<div
					ref={nodeRef}
					onClick={ClearaProduct}
					className="selectchoice-wrapper">
					<div className="selectchoice-container">
						<div>
							<div className="selectchoice-close-wrapper">
								<span className="selectchoice-close-head">
									<p>Select from here</p>
								</span>
								<button
									ref={targetnode}
									onClick={ClearaProduct}
									className="selectchoice-container-close">
									<IClose iwidth="22" iheight="22" />
								</button>
							</div>
						</div>

						<div className="selectchoice-color-size-wrapper">
							<div className="selectchoice-all-colors-and-size-wrapper">
								<span className="selectchoice-color-head">
									{data !== undefined &&
									data.pickcolor.length !== 0 ? (
										<p>
											Select a color for the size you
											chose
										</p>
									) : (
										""
									)}
								</span>
								<div className="selectchoice-colors-wrapper">
									{data !== undefined
										? data.pickcolor.map((pc) => (
												<span
													key={pc.id}
													style={{
														backgroundColor: `${pc.color}`,
													}}
													className="selectchoice-color">
													<p className="selectchoice-color-number"></p>

													<button
														onClick={() =>
															GetColorFunc(pc)
														}
														className="selectchoice-color-add-button">
														{getcolor ? (
															getcolor.some(
																(e) =>
																	e.id ===
																	pc.id
															) ? (
																<Check
																	iwidth="24px"
																	iheight="18px"
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
										: ""}
								</div>
								<span className="selectchoice-size-head">
									{data !== undefined &&
									data.picksize.length !== 0 ? (
										<p>Select a size(1) for a product</p>
									) : (
										""
									)}
								</span>
								<div className="selectchoice-sizes-wrapper">
									{data !== undefined
										? data.picksize.map((pc) => (
												<div
													key={pc.id}
													className="selectchoice-each-size-wrapper">
													<div className="selectchoice-each-size">
														<p>{pc.size}</p>
														<button
															onClick={() =>
																GetSizeFunc(pc)
															}
															className="selectchoice-color-add-button">
															{getsize ? (
																getsize.some(
																	(e) =>
																		e.id ===
																		pc.id
																) ? (
																	<Check
																		iwidth="24px"
																		iheight="18px"
																	/>
																) : (
																	""
																)
															) : (
																""
															)}
														</button>
													</div>
													<div className="selectchoice-each-size-price">
														<p>
															GH₵ {data.oldprice}
														</p>
													</div>
												</div>
										  ))
										: ""}
								</div>
							</div>
						</div>
						<div>
							<div className="selectchoice-submit-choice">
								<button
									className="selectchoice-submit-choice-button"
									ref={addnode}
									onClick={(e) =>
										PutProductInBag1(e, data.id)
									}>
									<p>Add to cart</p>
								</button>
								<button className="selectchoice-submit-choice-what-button">
									{data !== undefined ? (
										<a
											href={`https://wa.me/233501387484/?text=${pageurl}${
												apath === "/"
													? "aproduct/" +
													  data.name
															.split(" ")
															.join("-")
															.split("/")
															.join("-")
															.toLowerCase()
													: ""
											}/${apath === "/" ? data.id : ""}`}>
											<ShopWhat
												iwidth="27"
												iheight="27"
											/>
										</a>
									) : (
										""
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
			</AnimateTransition>
		</>
	);
};

export default React.memo(SelectChoice);
