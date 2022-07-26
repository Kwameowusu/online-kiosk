import { useContext, useState } from "react";
import { MyContext } from "../../contextapi/MyProvider";

const VisitorsInsight = () => {
	const { userview } = useContext(MyContext);
	// console.log(userview)
	const [getordertime, setgetordertime] = useState();
	return (
		<>
			<div className="analytic-card-one analytic-card">
				<div className="analytic-card-side1">
					<h3 className="header">Views</h3>

					<div className="analytic-card-input">
						<input
							type="date"
							name=""
							id=""
							onChange={(f) => {
								setgetordertime(f.target.value);
								console.log(
									new Date(
										userview[0].createdAt.seconds * 1000 +
											userview[0].createdAt.seconds /
												1000000
									).getFullYear()
								);
							}}
						/>
					</div>
				</div>
				<div className="analytic-card-side2">
					<div className="analytics-card-extra-details-wrapper1">
						<span className="analytics-card-extra-details1">
							<h5>Unique viewers :</h5>
							<p>
								{
									[
										...new Map(
											userview
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
																.seconds *
																1000 +
																b.createdAt
																	.seconds /
																	1000000
														).getDate() ===
															new Date(
																getordertime
															).getDate() &&
														new Date(
															b.createdAt
																.seconds *
																1000 +
																b.createdAt
																	.seconds /
																	1000000
														).getFullYear() ===
															new Date(
																getordertime
															).getFullYear() &&
														new Date(
															b.createdAt
																.seconds *
																1000 +
																b.createdAt
																	.seconds /
																	1000000
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
												.map((item) => [item.ip, item])
										).values(),
									].length
								}
							</p>
						</span>
						<span className="analytics-card-extra-details1">
							<h5>Viewers :</h5>
							<p>
								{
									userview.filter((b) => {
										if (
											getordertime === undefined ||
											getordertime === ""
										) {
											return b;
										} else if (
											new Date(
												b.createdAt.seconds * 1000 +
													b.createdAt.seconds /
														1000000
											).getDate() ===
												new Date(
													getordertime
												).getDate() &&
											new Date(
												b.createdAt.seconds * 1000 +
													b.createdAt.seconds /
														1000000
											).getFullYear() ===
												new Date(
													getordertime
												).getFullYear() &&
											new Date(
												b.createdAt.seconds * 1000 +
													b.createdAt.seconds /
														1000000
											).getMonth() +
												1 ===
												new Date(
													getordertime
												).getMonth() +
													1
										)
											return b;

										return "";
									}).length
								}
							</p>
						</span>
					</div>
					<div className="analytics-card-extra-details-wrapper2">
						<span className="analytics-card-extra-details2">
							<h5>Mobile :</h5>
							<p>
								{
									userview
										.filter((b) => {
											if (
												getordertime === undefined ||
												getordertime === ""
											) {
												return b;
											} else if (
												new Date(
													b.createdAt.seconds * 1000 +
														b.createdAt.seconds /
															1000000
												).getDate() ===
													new Date(
														getordertime
													).getDate() &&
												new Date(
													b.createdAt.seconds * 1000 +
														b.createdAt.seconds /
															1000000
												).getFullYear() ===
													new Date(
														getordertime
													).getFullYear() &&
												new Date(
													b.createdAt.seconds * 1000 +
														b.createdAt.seconds /
															1000000
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
										.filter((pp) => pp.device === "mobile")
										.length
								}
							</p>
						</span>
						<span className="analytics-card-extra-details2">
							<h5>Desktop :</h5>
							<p>
								{
									userview
										.filter((b) => {
											if (
												getordertime === undefined ||
												getordertime === ""
											) {
												return b;
											} else if (
												new Date(
													b.createdAt.seconds * 1000 +
														b.createdAt.seconds /
															1000000
												).getDate() ===
													new Date(
														getordertime
													).getDate() &&
												new Date(
													b.createdAt.seconds * 1000 +
														b.createdAt.seconds /
															1000000
												).getFullYear() ===
													new Date(
														getordertime
													).getFullYear() &&
												new Date(
													b.createdAt.seconds * 1000 +
														b.createdAt.seconds /
															1000000
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
										.filter((pp) => pp.device === "desktop")
										.length
								}
							</p>
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default VisitorsInsight;
