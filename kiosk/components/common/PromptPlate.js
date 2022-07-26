import { useRef } from "react";
import AnimateTransition from "./AnimateTransition";
import { Exclamation } from "./icons/Icons";

export const ErrorPlate = ({
	promptClassName,
	EnterAnimate,
	ExitAnimate,
	detailsError,
	timeOut,
	ErrMessage,
}) => {
	const aRef = useRef();
	return (
		<>
			<AnimateTransition
				promptClassName={promptClassName}
				EnterAnimate={EnterAnimate}
				ExitAnimate={ExitAnimate}
				detailsError={detailsError}
				timeOut={timeOut}
				nodeRef={aRef}>
				<div ref={aRef} className="errorplate-container">
					<span>
					<Exclamation  iwidth='50' iheight='50' />
						<p>{ErrMessage}</p>
					</span>
				</div>
			</AnimateTransition>
		</>
	);
};

export const ConfirmPay = ({ detailsError, aClick }) => {
	const payRef = useRef();

	return (
		<AnimateTransition
			EnterAnimate="BounceIn"
			ExitAnimate="BounceOut"
			detailsError={detailsError}
			timeOut="700"
			nodeRef={payRef}>
			<span ref={payRef} className="payoverlay-confirm-close">
				<Exclamation iwidth="32" iheight="32" />
				<p>Have you made payment</p>
				<button onClick={aClick} className="payoverlay">
					<p>Yes</p>
				</button>
			</span>
		</AnimateTransition>
	);
};
