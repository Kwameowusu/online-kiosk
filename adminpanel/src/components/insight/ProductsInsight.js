import { useContext } from "react";
import { MyContext } from "../../contextapi/MyProvider";

const ProductsInsight = () => {
	const { products } = useContext(MyContext);
	return (
		<>
			<div className="analytic-card-one analytic-card">
				<div className="analytic-card-side1">
					<p className="header">Products</p>

					<div className="analytic-card-input">
						<input
							type="date"
							name=""
							id=""
							style={{ visibility: "hidden" }}
						/>
					</div>
				</div>
				<div className="analytic-card-side2">
					<div className="analytics-card-extra-details-wrapper1">
						<span className="analytics-card-extra-details1">
							<h5>In Stock :</h5>
							<p>
								{
									products.filter(
										(pp) => pp.stock === "In stock"
									).length
								}
							</p>
						</span>
						<span className="analytics-card-extra-details1">
							<h5>Out of Stock :</h5>
							<p>
								{
									products.filter(
										(pp) => pp.stock === "Out of stock"
									).length
								}
							</p>
						</span>
					</div>
					<div className="analytics-card-extra-details-wrapper2">
						<span className="analytics-card-extra-details2">
							<p style={{ fontSize: "50px" }}>
								{
									[
										...new Map(
											products.map((item) => [
												item.id,
												item,
											])
										).values(),
									].length
								}
							</p>
						</span>
						{/* <span className="analytics-card-extra-details2"></span> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductsInsight;
