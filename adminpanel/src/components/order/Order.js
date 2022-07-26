import React from "react";
import Footer from "../common/Footer";
import TopNav from "../common/TopNav";
import ManageOrder from "./ManageOrder";

// import { MyContext } from "../../contextapi/MyProvider";

const Order = () => {
	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					height: "100vh",
				}}>
				<TopNav />
				<div className="order-wrapper">
					<div className="order-container">
						<ManageOrder />
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Order;
