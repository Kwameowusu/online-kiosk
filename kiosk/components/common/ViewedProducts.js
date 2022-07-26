import React, { useContext } from "react";
import Link from "next/link";

import { MyContext } from "../contextapi/MyProvider";
import { ColorBrightness } from "../utils/color-brightness";

const ViewedProducts = () => {
	const { getviewedproducts, setopencart } = useContext(MyContext);
	
	return (
		<>
			<div className="viewedproducts-wrapper">
				<div className="viewdproducts-all-each-wrapper">
					{getviewedproducts
						? getviewedproducts.map((vp) => (
								<Link
									key={vp.id}
									href={`/aproduct/${vp.name
										.split(" ")
										.join("-")
										.toLowerCase()}/${vp.id}`}>
									<div
										onClick={() => setopencart(false)}
										className="viewproducts-each-product">
									<div
										style={{
											backgroundColor: `${ vp.productsImages.image1.color}`,
										}}className="viewedproducts-product-image">
											<img
												onError={(e) =>
													(e.target.style.display =
														"none")
												}
												src={
													vp.productsImages.image1.url
												}
												alt=""
											/>
										</div>
										<div className="catalog-each-product1-stock">
											{vp.stock === "In stock" ? (
												<p className="in-stock1">
													In Stock
												</p>
											) : (
												<p className="in-stock2">
													{vp.stock}
												</p>
											)}
										</div>
										<div className="viewedproducts-product-details">
											<span className="viewedproducts-details-name">
												<p>
													{vp.name
														.charAt(0)
														.toUpperCase()}
													{vp.name
														.substring(1)
														.toLowerCase()}
												</p>
											</span>
											<span className="viewedproducts-details-price-wrapper">
											<span
												style={{
													backgroundColor: `${vp.productsImages.image1.color}`,
													color: ColorBrightness(
														vp.productsImages
															.image1.color
													)
														? "black"
														: "white",
												}}
												className="viewedproducts-details-price-container">
													<p>
														GH₵{" "}
														{Number(vp.oldprice) +
															Number(vp.discount)}
													</p>
												</span>
											</span>
										</div>
									</div>
								</Link>
						  ))
						: ""}
				</div>
			</div>
		</>
	);
};

export default ViewedProducts;


