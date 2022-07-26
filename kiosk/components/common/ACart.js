import React, { useContext, useRef } from "react";
import { MyContext } from "../contextapi/MyProvider";
import AnimateTransition from "./AnimateTransition";
import CartSvg from "./CartSvg";

const ACart = () => {
	const nodeRef = useRef();
	const { getproductsinbag, setopencart } = useContext(MyContext);
	return (
		<>
			<AnimateTransition
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={getproductsinbag.length !== 0 ? true : false}
				nodeRef={nodeRef}>
				<div
					ref={nodeRef}
					onClick={() => setopencart(true)}
					className="cart-wrapper">
					<CartSvg />
					<span>
						{getproductsinbag
							? getproductsinbag.reduce(
									(a, b) => +Number(a) + Number(b.data.count),
									0
							  )
							: ""}
					</span>
				</div>
			</AnimateTransition>
		</>
	);
};

export default ACart;
