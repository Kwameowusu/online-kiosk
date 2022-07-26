import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../contextapi/MyProvider";
import { ColorBrightness } from "../utils/color-brightness";
import Link from "next/link";
import Loader from "../common/Loader";
import SelectChoice from "../overlay/SelectChoice";
import CartOverlay from "../overlay/CartOverlay";
import { uinqId } from "../utils/uniqid";
import DetailsOverlay from "../overlay/DetailsOverlay";
import PayOverlay from "../overlay/payoverlay/PayOverlay";
import { ShopBag } from "../common/icons/Icons";

const Catalog = ({ allproducts, CatOrientation }) => {
	const {
		products,
		search,
		setproducts,
		loader,
		nextbatch,
		editclose,
		seteditclose,
		PutProductInBag,
		getcolor,
		getsize,
		setstockover,
		setstockover1,
		opencart,
		getproductsinbag,
		setgetproductsinbag,
		opendetails,
		openpay,
		GetViewedProduct,
		setcheckcartempty,
		openabout,
		openprivacy,
	} = useContext(MyContext);

	const [aproduct, setaproduct] = useState();
	const GetViewedProductInCat = (aproduct) => {
		GetViewedProduct(aproduct);
	};

	const CatalogEachProdWrapper = {
		height: "150px",
		width: "100%",
		marginBottom: "5px",
	};

	const CatalogEachProdCard = {
		display: "flex",
		justifyContent: "space-around",
	};
	const CatalogEachProdImage = {
		height: "100%",
		width: "50%",
	};

	const CatalogDetailsWrapper = {
		height: "100%",
		width: "50%",
		borderLeft : "1px  solid var(--thinBorderColor)"
	};

	

	const getData = (id) => {
		const apro = [
			...new Map(products.map((item) => [item.id, item])).values(),
		].find((p) => p.id === id);

		if (apro.stock === "Out of stock") {
			setstockover(true);
			setTimeout(() => {
				setstockover(false);
			}, 3000);
			return;
		}
		// console.log(id)

		const newBagItem1 = getproductsinbag.find((pro) => pro.data.id === id);
		// console.log( getproductsinbag[0].data.id )

		if (
			getproductsinbag.some((e) => e.data.id === id) &&
			newBagItem1.getacolor.length === 0 &&
			newBagItem1.getasize.length === 0
		) {
			if (newBagItem1.data.count === newBagItem1.data.stockNumber) {
				setstockover1(true);
				const timer = setTimeout(() => {
					setstockover1(false);
				}, 2000);

				return () => clearTimeout(timer);
			}
			const gg = getproductsinbag.map((n) => {
				if (n.data.id === id) {
					n.data.count = n.data.count + 1;
					n.data.price = n.data.oldprice * n.data.count;
				}
				return n;
			});
			setgetproductsinbag(JSON.parse(JSON.stringify(gg)));
			return;
		}

		if (apro.picksize.length === 0 && apro.pickcolor.length === 0) {
			PutProductInBag(getcolor, getsize, apro, uinqId());
			setcheckcartempty(false);
		} else {
			seteditclose(true);
			setaproduct(apro);
		}
	};
	useEffect(() => {
		setproducts((prev) => [...prev, ...allproducts]);
	}, []);

	useEffect(() => {
		if (editclose === true) {
			document.querySelector("body").style.overflow = "hidden";
		}
		if (editclose === null || editclose === false)
			document.querySelector("body").style.overflow = "initial";
	}, [editclose]);

	useEffect(() => {
		if (opencart === true) {
			document.querySelector("body").style.overflow = "hidden";
		}
		if (opencart === null || opencart === false)
			document.querySelector("body").style.overflow = "initial";
	}, [opencart]);
	useEffect(() => {
		if (opendetails === true) {
			document.querySelector("body").style.overflow = "hidden";
		}
		if (opendetails === null || opendetails === false)
			document.querySelector("body").style.overflow = "initial";
	}, [opendetails]);

	useEffect(() => {
		if (openpay === true) {
			document.querySelector("body").style.overflow = "hidden";
		}
		if (openpay === null || openpay === false)
			document.querySelector("body").style.overflow = "initial";
	}, [openpay]);

	useEffect(() => {
		if (openabout === true) {
			document.querySelector("body").style.overflow = "hidden";
		}
		if (openabout === null || openabout === false)
			document.querySelector("body").style.overflow = "initial";
	}, [openabout]);
	useEffect(() => {
		if (openprivacy === true) {
			document.querySelector("body").style.overflow = "hidden";
		}
		if (openprivacy === null || openprivacy === false)
			document.querySelector("body").style.overflow = "initial";
	}, [openprivacy]);

	return (
		<>
			<SelectChoice
				seteditclose={seteditclose}
				editclose={editclose}
				data={aproduct}
			/>
			<CartOverlay />
			<DetailsOverlay />
			<PayOverlay />
			<div
				style={{
					flexDirection:
					(	CatOrientation.length !== 0 &&
						CatOrientation[0].orient === "horizontal") ?
						"column":'row',
				}}
				className="catalog-wrapper1">
				{[...new Map(products.map((item) => [item.id, item])).values()]
					.filter((post) => {
						if (search === "" || search === undefined) {
							return post;
						} else if (
							post.name
								.toString()
								.toLowerCase()
								.includes(search.toString().toLowerCase()) ||
							post.category.name
								.toString()
								.toLowerCase()
								.includes(search.toString().toLowerCase())
						) {
							return post;
						}
					})
					.map((pro) => (
						<div
							key={pro.id}
							
							style={
								CatOrientation.length !== 0 &&
								CatOrientation[0].orient === "horizontal" ?
								CatalogEachProdWrapper :{}
							}
							className="catalog-each-product1-wrapper">
							<div className="catalog-each-product1-container">
								<Link
									href={`/aproduct/${pro.name
										.split(" ")
										.join("-")
										.split("/")
										.join("-")
										.toLowerCase()}/${pro.id}`}>
									<div
										onClick={() => {
											GetViewedProductInCat(pro);
										}}
										style={
											CatOrientation.length !== 0 &&
											CatOrientation[0].orient ===
												"horizontal" ?
											CatalogEachProdCard :{}
										}
										className="catalag-each-product-card">
										<div
											style={
												CatOrientation.length !== 0 &&
												CatOrientation[0].orient ===
													"horizontal" ? {
													backgroundColor: `${pro.productsImages.image1.color}`,
													...CatalogEachProdImage,
												}:{backgroundColor: `${pro.productsImages.image1.color}`}
											}
											className="catalog-each-product1-image">
											<img
												onError={(e) =>
													(e.target.style.display =
														"none")
												}
												src={
													pro.productsImages.image1
														.url
												}
												alt={pro.name}
											/>
										</div>

										<div className="catalog-each-product1-stock">
											{pro.stock === "In stock" ? (
												<p className="in-stock1">
													In Stock
												</p>
											) : (
												<p className="in-stock2">
													{pro.stock}
												</p>
											)}
										</div>
										<div 
										
										style={
											CatOrientation.length !== 0 &&
											CatOrientation[0].orient ===
												"horizontal" ?
											CatalogDetailsWrapper :{}
										}
											className="catalog-details-wrapper1">
											<div className="catalog-details-product1-name">
												<p className="p1">
													{pro.name
														.charAt(0)
														.toUpperCase()}
													{pro.name
														.substring(1)
														.toLowerCase()}
												</p>
											</div>
											<div className="catalog-each-product-price">
												<span className="catalog-each-product-previous-price">
													<p>
														GH₵{" "}
														{Number(pro.oldprice) +
															Number(
																pro.discount
															)}
													</p>
												</span>
												<span
													// style={{
													// 	backgroundColor: `${pro.productsImages.image1.color}`,
													// 	color: ColorBrightness(
													// 		pro.productsImages
													// 			.image1.color
													// 	)
													// 		? "black"
													// 		: "white",
													// }}
													className="catalog-each-product-current-price">
													<p>GH₵ {pro.oldprice}.00</p>
												</span>
											</div>
										</div>
									</div>
								</Link>
								<div className="catalog-each-addtocart-wrapper">
									<div className="catalog-each-addtocart-container">
										<button
											onClick={() => {
												getData(pro.id);
											}}
											className="catalog-each-addtocart-container-inner">
											<ShopBag
												iwidth="18"
												iheight="18"
												color="white"
											/>
											{/* <i className="fas fa-shopping-bag"></i> */}
										</button>
									</div>
								</div>
							</div>
						</div>
					))}

				{nextbatch ? (
					<div
						style={{
							marginTop: "20px",
							width: "100%",
							height: "30px",
							display: "flex",
							// alignItems: "center",
							justifyContent: "center",
						}}>
						<Loader cwidth={"10px"} cheight={"10px"} />
					</div>
				) : (
					<div
						ref={loader}
						style={{
							marginTop: "10px",
							width: "100%",
							height: "30px",
							display: "flex",
							fontWeight: "bolder",
							justifyContent: "center",
						}}>
						<div
							style={{
								backgroundColor: "#ff6b3d",
								width: "5px",
								height: "5px",
								borderRadius: "50%",
							}}></div>
					</div>
				)}
				{/* <div  className="catalog-bottom"></div> */}
			</div>
		</>
	);
};

export default React.memo(Catalog);
