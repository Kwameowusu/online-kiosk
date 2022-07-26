import React from "react";
import TopNav from "../common/TopNav";
import ProductRoutes from "./ProductRoutes";
import AddDisplayProduct from "./AddDisplayProduct"
import Footer from "../common/Footer";

const Product = () => {
	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					height:"100vh"
			}}
			>
			<TopNav />
				<div className="product-wrapper">
					
				<div className="product-container">
				    <ProductRoutes/>
					<AddDisplayProduct/>
				</div>
			</div>
			<Footer/>
			</div>
		
		</>
	);
};

export default Product;
