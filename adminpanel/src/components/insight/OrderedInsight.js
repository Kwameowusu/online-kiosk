import { useContext, useState } from "react";
// import { useEffect } from "react/cjs/react.production.min";
import { MyOrderContext } from "../../contextapi/OrderProvider";

const OrderedInsight = () => {
	const { orders } = useContext(MyOrderContext);
	const [getordertime, setgetordertime] = useState();

	// console.log(getordertime);

	// const [neworder, setneworder] = useState('')
	// useEffect(() => {

	// },[getordertime])

	return (
		<>
			<div className="analytic-card-one analytic-card">
				<div className="analytic-card-side1">
					<p className="header">Orders</p>

					<div className="analytic-card-input">
						<input
							onChange={(e) => setgetordertime(e.target.value)}
							type="date"
							name=""
							id=""
						/>
					</div>
				</div>
				<div className="analytic-card-side2">
					<div className="analytics-card-extra-details-wrapper1">
						<span className="analytics-card-extra-details1">
							<h5>orders :</h5>
							<p>
								{
									[
										...new Map(
											orders
												.filter((b) => {
													if (
														getordertime ===
															undefined ||
														getordertime === ""
													) {
														return b;
													} else if (
														new Date(
															b.createdAt
														).getDate() ===
															new Date(
																getordertime
															).getDate() &&
														new Date(
															b.createdAt
														).getFullYear() ===
															new Date(
																getordertime
															).getFullYear() &&
														new Date(
															b.createdAt
														).getMonth() +
															1 ===
															new Date(
																getordertime
															).getMonth() +
																1
													)
														return b;

													return "";
												})
												.map((item) => [
													item.code,
													item,
												])
										).values(),
									].length
								}
							</p>
						</span>
						<span className="analytics-card-extra-details1">
							<h5>Delivered :</h5>
							<p>
								{}
								{orders
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
										(a, b) =>
											+Number(a) + Number(b.isChecked),
										0
									)}
							</p>
						</span>
					</div>
					<div className="analytics-card-extra-details-wrapper2">
						<span className="analytics-card-extra-details2">
							<h5>Unread Orders :</h5>
							<p>
								{Number(
									[
										...new Map(
											orders
												.filter((b) => {
													if (
														getordertime ===
															undefined ||
														getordertime === ""
													) {
														return b;
													} else if (
														new Date(
															b.createdAt
														).getDate() ===
															new Date(
																getordertime
															).getDate() &&
														new Date(
															b.createdAt
														).getFullYear() ===
															new Date(
																getordertime
															).getFullYear() &&
														new Date(
															b.createdAt
														).getMonth() +
															1 ===
															new Date(
																getordertime
															).getMonth() +
																1
													)
														return b;

													return "";
												})
												.map((item) => [
													item.code,
													item,
												])
										).values(),
									].length
								) -
									Number(
										orders
											.filter((b) => {
												if (
													getordertime ===
														undefined ||
													getordertime === ""
												) {
													return b;
												} else if (
													new Date(
														b.createdAt
													).getDate() ===
														new Date(
															getordertime
														).getDate() &&
													new Date(
														b.createdAt
													).getFullYear() ===
														new Date(
															getordertime
														).getFullYear() &&
													new Date(
														b.createdAt
													).getMonth() +
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
												(a, b) =>
													+Number(a) +
													Number(b.isRead),
												0
											)
									)}
							</p>
						</span>
						<span className="analytics-card-extra-details2">
							<h5>UnDelivered :</h5>
							<p>
								{Number(
									[
										...new Map(
											orders

												.filter((b) => {
													if (
														getordertime ===
															undefined ||
														getordertime === ""
													) {
														return b;
													} else if (
														new Date(
															b.createdAt
														).getDate() ===
															new Date(
																getordertime
															).getDate() &&
														new Date(
															b.createdAt
														).getFullYear() ===
															new Date(
																getordertime
															).getFullYear() &&
														new Date(
															b.createdAt
														).getMonth() +
															1 ===
															new Date(
																getordertime
															).getMonth() +
																1
													)
														return b;

													return "";
												})
												.map((item) => [
													item.code,
													item,
												])
										).values(),
									].length
								) -
									Number(
										orders

											.filter((b) => {
												if (
													getordertime ===
														undefined ||
													getordertime === ""
												) {
													return b;
												} else if (
													new Date(
														b.createdAt
													).getDate() ===
														new Date(
															getordertime
														).getDate() &&
													new Date(
														b.createdAt
													).getFullYear() ===
														new Date(
															getordertime
														).getFullYear() &&
													new Date(
														b.createdAt
													).getMonth() +
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
												(a, b) =>
													+Number(a) +
													Number(b.isChecked),
												0
											)
									)}
							</p>
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default OrderedInsight;
