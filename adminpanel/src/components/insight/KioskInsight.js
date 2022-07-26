import React from "react";
import Footer from "../common/Footer";
import TopNav from "../common/TopNav";
import DeliveredInsight from "./DeliveredInsight";
import OrderedInsight from "./OrderedInsight";
import ProductsInsight from "./ProductsInsight";
import VisitorsInsight from "./VisitorsInsight";

const KioskInsight = () => {
	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					height: "100vh",
				}}>
				<TopNav />
				<div className="analytics-wrapper">
					<div className="analytics-container">
						<div className="analytics-card-container">
							<DeliveredInsight />
							<OrderedInsight />
						</div>
						<div className="analytics-card-container">
							<ProductsInsight />

							<VisitorsInsight />
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default KioskInsight;
