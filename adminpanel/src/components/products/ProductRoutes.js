import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const ProductRoutes = () => {
	let location = useLocation();
	return (
		<>
			<div className="productroutes-wrapper">
				<div>
					<div className="productroutes-container">
						<div className="productroutes-container-header">
							<p>Product management</p>
						</div>

						<div className="productroutes-routes-wrappper">
							<NavLink
								to=""
								className="productroutes-each-route-wrapper">
								<div className="productroutes-isactive-wrapper">
									{location.pathname === "/displayproduct" && (
										<span className="productroutes-isactive"></span>
									)}
								</div>

								<span className="productroutes-each-route-container">
									<p>Display Product</p>
								</span>
							</NavLink>{" "}
							<NavLink
								to="addproduct"
								className="productroutes-each-route-wrapper">
								<div className="productroutes-isactive-wrapper">
									{location.pathname === "/displayproduct/addproduct" && (
										<span className="productroutes-isactive"></span>
									)}
								</div>

								<span className="productroutes-each-route-container">
									<p>Add Product</p>
								</span>
							</NavLink>{" "}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductRoutes;


/*


*/