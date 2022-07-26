import React, { useRef, useEffect } from "react";

export default function PayPal({ code, totalcost }) {
	const paypal = useRef();
	// console.log(Number( 0.01 + totalcost));
	useEffect(() => {
		window.paypal
			.Buttons({
				// style: {
				// 	shape: "rect",
				// 	color: "gold",
				// 	layout: "vertical",
				// 	label: "paypal",
				// },
				createOrder: (data, actions, err) => {
					return actions.order.create({
						intent: "CAPTURE",
						purchase_units: [
							{
								description: code,
								amount: {
									currency_code: "USD",
									value: 0.01 + totalcost,
								},
							},
						],
					});
				},
				onApprove: async (data, actions) => {
					const order = await actions.order.capture();
					console.log(order);
				},
				onError: (err) => {
					console.log(err);
				},
			})
			.render(paypal.current);
	}, []);

	return (
		<div>
			<div ref={paypal}></div>
		</div>
	);
}
