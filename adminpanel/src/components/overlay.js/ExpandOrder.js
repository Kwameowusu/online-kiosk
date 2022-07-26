import React, { useRef } from "react";
import AnimateTransition from "../common/AnimateTransition";
import { IClose } from "../common/icons/Icons";
import { ColorBrightness } from "../util/color-brightness";
// import { uinqId } from "../util/uniqid";

const ExpandOrder = ({ setshowdetails, showdetails, orderinfo }) => {
	const nodeRef = useRef();

	return (
		<>
			<AnimateTransition
				promptWrapeprClassName="yes"
				timeOut={300}
				EnterAnimate="ZoomIn"
				ExitAnimate="ZoomOut"
				detailsError={showdetails}
				nodeRef={nodeRef}>
				<div ref={nodeRef} className="expandorder-wrapper">
					<div className="expandorder-container">

						<span className="expandorder-expand-wrapper">
							<button onClick={() => setshowdetails(false)}>
								<IClose iwidth="16" iheight="16" />
							</button>
						</span>
						<div className="expandorder-all-details-wrapper">
							<div className="expandorder-each-order">
								<span className="expandorder-each-order-name-head">
									<p>Order Date</p>
								</span>
								<span className="expand0rder-each-order">
									{orderinfo.createdAt
										? `${new Date(
												orderinfo.createdAt
										  ).toLocaleDateString("en-gb", {
												year: "numeric",
												month: "long",
												day: "numeric",
										  })}

										${Intl.DateTimeFormat("en", {
											hour: "numeric",
											minute: "numeric",
											hour12: true,
										}).format(orderinfo.createdAt)}
										`
										: ""}
								</span>
							</div>
							<div className="expandorder-each-order">
								<span className="expandorder-each-order-name-head">
									<p>Order number</p>
								</span>
								<span className="expand0rder-each-order">
									{orderinfo.code}
								</span>
							</div>
							<div className="expandorder-each-order">
								<span className="expandorder-each-order-name-head">
									<p>Amount </p>
								</span>
								<span className="expand0rder-each-order">
									{new Intl.NumberFormat("en-Us", {
										style: "currency",
										currency: "GHC",
									}).format(orderinfo.amount)}
								</span>
							</div>
							<div className="expandorder-each-order">
								<span className="expandorder-each-order-name-head">
									<p>Name</p>
								</span>
								<span className="expand0rder-each-order">
									{orderinfo.name}
								</span>
							</div>
							<div className="expandorder-each-order">
								<span className="expandorder-each-order-name-head">
									<p>Email Address</p>
								</span>
								<span className="expand0rder-each-order">
									<a href="mailto:boahemaaa@gmail.com">
										{orderinfo.email}
									</a>
								</span>
							</div>{" "}
							<div className="expandorder-each-order">
								<span className="expandorder-each-order-name-head">
									<p>Phone number</p>
								</span>
								<span className="expand0rder-each-order">
									<a href="tel:+233501387484">
										{orderinfo.phone}
									</a>
								</span>
							</div>{" "}
							<div className="expandorder-each-order">
								<span className="expandorder-each-order-name-head">
									<p>Location</p>
								</span>
								{orderinfo.region ? (
									<span className="expand0rder-each-order">
										{`${orderinfo.region},${orderinfo.reglocation}`}
									</span>
								) : (
									<span className="expand0rder-each-order">
										{`${orderinfo.country},${orderinfo.province},${orderinfo.town}`}
									</span>
								)}
							</div>
							{orderinfo.postalcode ? (
								<div className="expandorder-each-order">
									<span className="expandorder-each-order-name-head">
										<p>Postal Code</p>
									</span>
									<span className="expand0rder-each-order">
										{orderinfo.postalcode}
									</span>
								</div>
							) : (
								""
							)}
							<div className="expandorder-each-order">
								<span className="expandorder-each-order-name-head">
									<p>Extra details</p>
								</span>
								<span className="expand0rder-each-order">
									{orderinfo.extradetails}
								</span>
							</div>
							{orderinfo.products !== undefined
								? orderinfo.products.map((po) => (
										<div
											key={po.id}
											className="expandorder-each-order">
											<span className="expandorder-each-order-name-head">
												<p>Ordered product</p>
											</span>
											<span className="expand0rder-each-order">
												Product name: {po.productname}
											</span>
											<span className="expand0rder-each-order">
												Number of products: {po.count}
											</span>
											<span className="expand0rder-each-order">
												Cost: {po.price}
											</span>

											<span className="expand0rder-each-order">
												Size: {po.size}
											</span>
											<span
												style={{
													backgroundColor: po.color,
												}}
												className="expand0rder-each-order">
												<span
													style={{
														color: po.color
															? ColorBrightness(
																	po.color
															  )
																? "black"
																: "white"
															: "",
													}}>
													Color :
												</span>

												<span
													style={{
														backgroundColor:
															po.color,
														color: po.color
															? ColorBrightness(
																	po.color
															  )
																? "black"
																: "white"
															: "",
													}}>
													{po.color}
												</span>
											</span>
										</div>
								  ))
								: ""}
						</div>
					</div>
				</div>
			</AnimateTransition>
		</>
	);
};

export default ExpandOrder;
