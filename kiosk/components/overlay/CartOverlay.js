import React, { useContext, useRef, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AnimateTransition from "../common/AnimateTransition";
import { MyContext } from "../contextapi/MyProvider";
import "animate.css";
import ShopBag2 from "../common/ShopBag2";
import ViewedProducts from "../common/ViewedProducts";
import { AngleDown, IClose, Minus, Plus } from "../common/icons/Icons";

const CartOverlay = () => {
	const nodeRef = useRef();
	const cartref = useRef();

	const {
		opencart,
		setopencart,
		getproductsinbag,
		setgetproductsinbag,
		totalprice,
		settotalprice,
		setopendetails,
		setstockover1,
		checkcartempty,
		setcheckcartempty,
		setcartnotempty,
		deliveryfee,
		setgetviewedproducts,
	} = useContext(MyContext);

	const RemoveAProductInBag = (id) => {
		const rp = getproductsinbag.filter((kk) => kk.id !== id);
		setgetproductsinbag(JSON.parse(JSON.stringify(rp)));

		if (rp.length === 0) {
			setTimeout(() => {
				setcheckcartempty(true);
			}, 400);
		}
	};
	const IncreaseProductNumber = (productId) => {
		const newBagItem = getproductsinbag.find((pro) => pro.id === productId);

		if (newBagItem.data.count === newBagItem.data.stockNumber) {
			setstockover1(true);
			const timer = setTimeout(() => {
				setstockover1(false);
			}, 2000);

			return () => clearTimeout(timer);
		}
		const yy = getproductsinbag.map((n) => {
			if (n.id === productId) {
				n.data.count = n.data.count + 1;
				n.data.price = n.data.oldprice * n.data.count;
				const hh = totalprice + n.data.oldprice;
				settotalprice(hh);
			}
			return n;
		});
		setgetproductsinbag(JSON.parse(JSON.stringify(yy)));
	};
	const DecreaseProductNumber = (productId) => {
		const yy = getproductsinbag.map((n) => {
			if (n.id === productId) {
				n.data.count = n.data.count - 1;
				n.data.price = n.data.oldprice * n.data.count;
				if (n.data.count < 2) {
					n.data.count = 1;
					n.data.price = n.data.oldprice;
				}
				const hh = getproductsinbag.reduce(
					(a, b) => +Number(a) + Number(b.data.price),
					0
				);
				settotalprice(hh);
			}
			return n;
		});

		setgetproductsinbag(JSON.parse(JSON.stringify(yy)));
	};

	const ClearBag = () => {
		setgetproductsinbag([]);
		setTimeout(() => {
			setcheckcartempty(true);
		}, 400);
	};

	useEffect(() => {
		const hh = getproductsinbag.reduce(
			(a, b) => +Number(a) + Number(b.data.price),
			0
		);
		settotalprice(hh);
	}, [getproductsinbag]);

	const ToDetails = () => {
		if (getproductsinbag.length === 0) {
			setcartnotempty(true);
			setTimeout(() => {
				setcartnotempty(false);
			}, 2000);
			return;
		}
		setopencart(false);
		setTimeout(() => {
			setopendetails(true);
		}, 500);
	};
	return (
		<>
			<AnimateTransition
				promptWrapeprClassName="yes"
				timeOut="300"
				EnterAnimate="slideInUp"
				ExitAnimate="slideOutDown"
				detailsError={opencart}
				nodeRef={nodeRef}>
				<div ref={nodeRef} className="cartoverlay-wrapper">
					<div className="cartoverlay-container">
						<div className="cartoverlay-close-wrapper">
							<button
								onClick={() => setopencart(false)}
								className="overlay-close-container">
								<IClose iheight="20" iwidth="20" />
							</button>
						</div>
						<details className="cartoverlay-details">
							<summary className="catoverlay-summary">
								<div>
									<span className="cartoverlay-cost-summary-name">
										<AngleDown iwidth="16" iheight="16" />
										Order Summary
									</span>
									<span className="cartoverlay-cost-summary-wrapper">
										{getproductsinbag.length !== 0 &&
										deliveryfee.length !== 0 ? (
											<p>
												{new Intl.NumberFormat(
													"en-Us",
													{
														style: "currency",
														currency: "GHC",
													}
												).format(
													totalprice +
														Number(
															deliveryfee[0]
																.Amount
														)
												)}
											</p>
										) : (
											<p>0.00</p>
										)}
									</span>
								</div>
							</summary>

							<div className="cartoverlay-cost-summary-show-wrapper">
								<div>
									<span className="cartoverlay-cost-summary-show-subtotal">
										Sub Total
									</span>
									<span className="cartoverlay-cost-summary-show-subtotal-cost">
										<p>{totalprice}.00</p>
										<p>GH₵</p>
									</span>
								</div>
								<div>
									<span className="cartoverlay-cost-summary-show-delivery">
										Delivery fee
									</span>
									<span className="cartoverlay-cost-summary-show-delivery-cost">
										<p>
											{deliveryfee.length !== 0
												? deliveryfee[0].Amount
												: ""}
										</p>
										<p>GH₵</p>
									</span>
								</div>
							</div>
						</details>
						<div className="cartoverlay-item-in-cart-wrapper">
							<div className="cartoverlay-item-in-cart-head">
								<p>Items in bag</p>
								<span onClick={ClearBag}>Clear all</span>
							</div>
							<div className="cartoverlay-item-all-wrapper">
								<div className="cartoverlay-item-all-container">
									<TransitionGroup>
										{[
											...new Map(
												getproductsinbag.map((item) => [
													item.id,
													item,
												])
											).values(),
										].map((nn) => (
											<CSSTransition
												key={nn.id}
												classNames={{
													enterActive:
														"animate__animated animate__lightSpeedInLeft",
													exitActive:
														"animate__animated animate__fadeOutDown",
												}}
												timeout={400}>
												<div className="cartoverlay-item-each-wrapper-container">
													<div className="cartoverlay-item-each-wrapper">
														<div className="cartoverlay-item-each-image-wrapper">
															<div
																style={{
																	backgroundColor: `${nn.data.productsImages.image1.color}`,
																}}
																className="cartoverlay-item-each-image-container">
																<img
																	onError={(
																		e
																	) =>
																		(e.target.style.display =
																			"none")
																	}
																	src={
																		nn.data
																			.productsImages
																			.image1
																			.url
																	}
																	alt=""
																/>
															</div>
														</div>
														<span className="cartoverlay-item-each-image-remove-wrapper">
															<button
																onClick={() => {
																	RemoveAProductInBag(
																		nn.id
																	);
																	// 	ShowTotalPriceOnDelete(
																	// 		nn.data.price
																	// 	);
																}}
																className="cartoverlay-item-each-image-remove">
																<IClose
																	iheight="18"
																	iwidth="18"
																/>
															</button>
														</span>

														<div className="cartoverlay-item-each-details">
															<div className="cartoverlay-item-each-details-name">
																<p className="name">
																	{nn.data.name
																		.charAt(
																			0
																		)
																		.toUpperCase()}
																	{nn.data.name
																		.substring(
																			1
																		)
																		.toLowerCase()}
																</p>
																<div className="cartoverlay-variant-wrapper">
																	{nn.getasize
																		.length ===
																	0 ? (
																		""
																	) : (
																		<span className="cartoverlay-variant-size">
																			<p>
																				{
																					nn
																						.getasize[0]
																						.size
																				}
																			</p>
																		</span>
																	)}
																	{nn
																		.getacolor
																		.length ===
																	0 ? (
																		""
																	) : (
																		<span
																			style={{
																				backgroundColor: `${nn.getacolor[0].color}`,
																			}}
																			className="cartoverlay-variant-color"></span>
																	)}
																</div>
																<span className="cartoverlay-item-each-details-price">
																	<p>GH₵</p>
																	<p>
																		{
																			nn
																				.data
																				.price
																		}
																	</p>
																</span>
															</div>
															<div className="cartoverlay-item-each-details-number">
																<button
																	onClick={() =>
																		IncreaseProductNumber(
																			nn.id
																		)
																	}
																	className="increase">
																	<Plus
																		iwidth="18"
																		iheight="18"
																	/>
																</button>
																<div className="number">
																	{
																		nn.data
																			.count
																	}
																</div>
																<button
																	onClick={() =>
																		DecreaseProductNumber(
																			nn.id
																		)
																	}
																	className="decrease">
																	<Minus
																		iwidth="18"
																		iheight="18"
																	/>
																</button>
															</div>
														</div>
													</div>
												</div>
											</CSSTransition>
										))}
									</TransitionGroup>
									{/* {  ? (
										<div className="cartoverlay-item-empty-wrapper">
											<span className="cartoverlay-item-empty-icon">
												<ShopBag2 />
											</span>
											<span className="cartoverlay-item-empty-head">
												<p>Your Cart is empty</p>
											</span>
										</div>
									) : (
										""
									)} */}
									<AnimateTransition
										timeOut="750"
										EnterAnimate="BounceIn"
										ExitAnimate="BounceOut"
										detailsError={checkcartempty}
										nodeRef={cartref}>
										<div
											ref={cartref}
											className="cartoverlay-item-empty-wrapper">
											<span className="cartoverlay-item-empty-icon">
												<ShopBag2 />
											</span>
											<span className="cartoverlay-item-empty-head">
												<p>Your Cart is empty</p>
											</span>
										</div>
									</AnimateTransition>
								</div>
								<div className="cartoverlay-viewed-products-wrapper">
									<span className="cartoverlay-viewed-products-head">
										<p
											onClick={() => {
												window.localStorage.removeItem(
													"vieweditems"
												);
												setgetviewedproducts([]);
											}}>
											Products you have viewed
										</p>
									</span>
									<ViewedProducts />
								</div>
							</div>
						</div>
						<div className="cartoverlay-checkout-wrapper">
							<button onClick={ToDetails}>Proceed</button>
						</div>
					</div>
				</div>
			</AnimateTransition>
		</>
	);
};

export default CartOverlay;
