import React from "react";
import { Outlet } from "react-router-dom";

const AddPageProduct = () => {
	return (
		<>
			<div className="adddisplayproduct-wrapper">
			
					<Outlet />
			
			</div>
		</>
	);
};

export default AddPageProduct;
