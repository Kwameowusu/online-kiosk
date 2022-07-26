import { useContext, useState } from "react";
import { MyOrderContext } from "../../contextapi/OrderProvider";

const DeliveredInsight = () => {
	const { orders } = useContext(MyOrderContext);
	const [getordertime, setgetordertime] = useState();

	// const OnChangeDate = (e) => {
	// 	e.preventDefault();
	// 	// console.log(new Date(e.target.value).getDate());
	// 	// console.log(new Date(e.target.value).getFullYear());
	// 	// console.log(new Date(e.target.value).getMonth() + 1);

	// 	// console.log(new Date(orders[0].createdAt).getDate());
	// 	// console.log(new Date(orders[0].createdAt).getFullYear());
	// 	// console.log(new Date(orders[0].createdAt).getMonth() + 1);

	// 	console.log();
	// };
	return (
		<>
			<div className="analytic-card-one analytic-card">
				<div className="analytic-card-side1">
					<p className="header">
						Sales .
						<small>
							<i>delivered</i>
						</small>{" "}
					</p>

					<div className="analytic-card-input">
						<input
							type="date"
							name=""
							id=""
							onChange={(e) => setgetordertime(e.target.value)}
						/>
					</div>
				</div>
				<div className="analytic-card-side2">
					<div className="analytics-card-extra-details-wrapper3">
						<p>
							{new Intl.NumberFormat("en-Us", {
								style: "currency",
								currency: "GHC",
							}).format(
								orders
									.filter((p) => p.isChecked === 1)
									.filter((b) => {
										if (
											getordertime === undefined ||
											getordertime === ""
										) {
											return b;
										} else if (
											new Date(b.createdAt).getDate() ===
												new Date(
													getordertime
												).getDate() &&
											new Date(
												b.createdAt
											).getFullYear() ===
												new Date(
													getordertime
												).getFullYear() &&
											new Date(b.createdAt).getMonth() +
												1 ===
												new Date(
													getordertime
												).getMonth() +
													1
										)
											return b;

										return "";
									})
									.reduce(
										(a, b) => +Number(a) + Number(b.amount),
										0
									)
							)}
						</p>
					</div>
					{/* <div className="analytics-card-extra-details-wrapper2">
						
					</div> */}
				</div>
			</div>
		</>
	);
};

export default DeliveredInsight;
