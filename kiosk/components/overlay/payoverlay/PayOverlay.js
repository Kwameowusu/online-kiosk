import React, { useContext, useRef, useState } from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import AnimateTransition from "../../common/AnimateTransition";
import { MyContext } from "../../contextapi/MyProvider";
import "animate.css";
import { ConfirmPay } from "../../common/PromptPlate";
import { ClipboardCheck, IClose } from "../../common/icons/Icons";
// import PayPal from "./PayPal";
const PayOverlay = () => {
	const nodeRef = useRef();

	const { openpay, setopenpay, code, setapay, apay, merchid } =
		useContext(MyContext);
	const [payprompt, setpayprompt] = useState(null);

	const ToCart = () => {
		setopenpay(false);
		setpayprompt(false);
		setopenpay(false);
		setapay(() => {
			return {
				code: "",
				apay: "no",
				totalcost: "",
			};
		});
	};

	const AddClipboard = () => {
		navigator.clipboard.writeText("#445625");
	};

	return (
		<>
			<ConfirmPay detailsError={payprompt} aClick={ToCart} />
			<AnimateTransition
				promptWrapeprClassName="yes"
				timeOut="300"
				EnterAnimate="slideInUp"
				ExitAnimate="slideOutDown"
				detailsError={openpay}
				nodeRef={nodeRef}>
				<div ref={nodeRef} className="payoverlay-wrapper">
					<div className="payoverlay-container">
						<div className="payoverlay-close-wrapper">
							<button
								onClick={() => {
									setpayprompt(true);
								}}
								className="payoverlay-close-container">
								<IClose iwidth="22" iheight="22" />
							</button>
						</div>
						<div className="payoverlay-content-wrapper">
							<div className="payoverlay-order-code-wrapper">
								<div className="payoverlay-order-code-container">
									<span>
										<p>ORDER CODE: </p>{" "}
										<p>{code || apay.code}</p>
									</span>
									<p className="note-text">
										Please use the order code as the Mobile
										money reference .
									</p>
								</div>
							</div>
							<div className="payoverlay-momo-wrapper">
								<div className="payoverlay-momo-container">
									<p className="payoverlay-momo-head">
										Pay to our mobile money locally with our
										merchant id
									</p>
									<span className="payoverlay-momo-merch">
										{merchid.length !== 0 ? (
											<p>
												Merchant ID:{" "}
												{merchid[0].merchid}
											</p>
										) : (
											""
										)}

										<button
											onClick={AddClipboard}
											className="payoverlay-momo-merch-copy">
											<p>copy</p>
											<ClipboardCheck iheight='20' iwidth='20' />
										</button>
									</span>
									<p>Reference: {code}</p>
								</div>
							</div>
							<span className="payoverlay-congrat">
								{/* <PayPal
									code={apay.code}
									totalcost={apay.totalcost}
								/> */}
								<span
									style={{
										width: "100%",
										display: "flex",
										justifyContent: "center",
									}}>
									<i>🎉🎉</i>
								</span>
							</span>
						</div>
					</div>
				</div>
			</AnimateTransition>
		</>
	);
};

export default PayOverlay;
