import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext, useRef } from "react";
import ACart from "../common/ACart";
import Footer from "../common/Footer";
import { ErrorPlate } from "../common/PromptPlate";
import ViewedProducts from "../common/ViewedProducts";
import { MyContext } from "../contextapi/MyProvider";
// import pbanner from "../images/pbanner.jpg";
import CartOverlay from "../overlay/CartOverlay";
import DetailsOverlay from "../overlay/DetailsOverlay";
import PayOverlay from "../overlay/payoverlay/PayOverlay";
import SelectChoice from "../overlay/SelectChoice";
import { ColorBrightness } from "../utils/color-brightness";

import { useRouter } from "next/router";
import { uinqId } from "../utils/uniqid";
import {
	AngleLeft,
	ArrowLeft,
	ArrowRight,
	Share,
	ShopBag,
	ShopWhat,
} from "../common/icons/Icons";

const EachProduct = ({
	data,
	kioskName,
	kioskCover,
	kioskTheme,
	KioskSocialLinks,
	Kioskvericode,
}) => {
	const [pageurl, setpageurl] = useState("");

	const route = useRouter().asPath;
	// console.log(route)

	const node = useRef();

	useEffect(() => {
		let line = [];
		let ml = [];

		setInterval(function () {
			if (node.current === null) return;
			const bannerChildWidth = node.current.childNodes[0].clientWidth;

			if (line.length !== node.current.childNodes.length - 1) {
				ml = [];
				line.push(node.current.scrollLeft);

				node.current.scrollBy({
					left: bannerChildWidth,
					top: 0,
					behaviour: "smooth",
				});
			} else if (line.length === node.current.childNodes.length - 1) {
				ml.push(node.current.scrollLeft);

				node.current.scrollBy({
					left: -bannerChildWidth,
					top: 0,
					behaviour: "smooth",
				});

				if (ml.length === node.current.childNodes.length - 1) {
					line = [];
				}
			}
		}, 3000);
	}, []);

	useEffect(() => {
		let ff = document.getElementsByTagName("BODY")[0];

		if (kioskTheme.length !== 0) {
			ff.classList.replace(ff.className, kioskTheme[0].themename);
		}
	}, []);

	useEffect(() => {
		let ff = document.getElementsByTagName("BODY")[0];
		if (kioskCover.length === 0) {
			
			if (ff.className === "blue-pink-light") {
				var meta = document.createElement("meta");
				meta.name = "theme-color";
				meta.content = "#dfdfe8";
				document.head.appendChild(meta);
				return;
			}
			if (ff.className === "green-yellow-light") {
				var meta = document.createElement("meta");
				meta.name = "theme-color";
				meta.content = "#dfe8e0";
				document.head.appendChild(meta);
				return;
			}
			if (ff.className === "neutral-light") {
				var meta = document.createElement("meta");
				meta.name = "theme-color";
				meta.content = "#dee1e4";
				document.head.appendChild(meta);
				return;
			}
			if (ff.className === "blue-pink-dark") {
				var meta = document.createElement("meta");
				meta.name = "theme-color";
				meta.content = "#1e1e21";
				document.head.appendChild(meta);
				return;
			}
			if (ff.className === "green-yelow-dark") {
				var meta = document.createElement("meta");
				meta.name = "theme-color";
				meta.content = "#222522";
				document.head.appendChild(meta);
				return;
			}

			if (ff.className === "neutral-dark") {
				var meta = document.createElement("meta");
				meta.name = "theme-color";
				meta.content = "#202020";
				document.head.appendChild(meta);
				return;
			}
		}
	}, []);

	useEffect(() => {
		setpageurl(window.location.href);
	}, []);
	const {
		addproducterror,
		editclose,
		seteditclose,
		PutProductInBag,
		getcolor,
		getsize,
		opencart,
		opendetails,
		openpay,
		setstockover,
		setstockover1,
		stockover,
		stockover1,
		getproductsinbag,
		setgetproductsinbag,
		setcheckcartempty,
		phoneerror,
		regionerror,
		reglocerror,
		apay,
		setopenpay,
		setgetviewedproducts,
		cartnotempty,
	} = useContext(MyContext);
	const shareLink = async () => {
		try {
			await navigator.share({
				title: data.title,
				url: window.location.href,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const CheckVariant = (id) => {
		if (data.stock === "Out of stock") {
			setstockover(true);
			setTimeout(() => {
				setstockover(false);
			}, 3000);
			return;
		}
		console.log(id);

		const newBagItem1 = getproductsinbag.find((pro) => pro.data.id === id);

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

		if (data.picksize.length === 0 && data.pickcolor.length === 0) {
			PutProductInBag(getcolor, getsize, data, uinqId());
			setcheckcartempty(false);
		} else {
			seteditclose(true);
		}
	};

	useEffect(() => {
		console.log(apay.apay);

		if (apay.apay === "yes") {
			setopenpay(true);
		}
	}, [apay]);

	useEffect(() => {
		if (editclose === true) {
			document.querySelector("body").style.overflow = "hidden";
		}
		if (editclose === null || editclose === false)
			document.querySelector("body").style.overflow = "initial";
	}, [editclose]);

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

	return (
		<>
			<Head>
				<title>{data.name} </title>
				<link
					rel="canonical"
					href={`https://oskdark.vercel.app/${route}`}
				/>
				
				<meta
					name="facebook-domain-verification"
					content={Kioskvericode[0].facebook}
				/>
				<meta
					name="google-site-verification"
					content={Kioskvericode[0].google}
				/>

				<meta property="og:locale" content="en_US" />
				<meta property="og:site_name" content="Granddies" />
				<meta
					property="og:url"
					content={`https://oskdark.vercel.app/${route}`}
				/>
				<meta property="og:type" content="E-commerce" />
				<meta property="og:article:section" content="Granddies" />
				<meta property="og:title" content={data.name} />
				<meta property="og:description" content={data.description} />
				<meta property="og:image" content={data.productBanner.url} />
				<meta
					property="og:image:secure_url"
					content={data.productsImages.url1}
				/>
				<meta property="og:image:width" content="1079" />
				<meta property="og:image:height" content="970" />
				<meta property="og:image:alt" content={data.description} />

				<meta property="og:site_name" content="Granddies kiosk" />

				<meta
					property="article:published_time"
					content="2021-11-21T21:52:10+00:00"
				/>
				<meta
					property="article:modified_time"
					content="2021-11-21T21:52:17+00:00"
				/>
				{/* <meta
                        property="article:published_time"
                        content={data.date}
                    />
                    <meta
                        property="article:modified_time"
                        content={data.date}
                    /> */}
				<meta property="article:author" content="@B_Owusu_kwame" />
				<meta name="twitter:site" content="@OSKBRIDGE" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="oskdark.vercel.app" />
				<meta
					property="twitter:url"
					content={`https://oskdark.vercel.app/${route}`}
				/>
				<meta name="twitter:title" content={data.name} />
				<meta name="twitter:description" content={data.description} />
				<meta name="twitter:image" content={data.productBanner.url} />

				<meta name="twitter:label1" content="Posted by" />
				<meta name="twitter:data1" content="Granddies" />
				<meta name="twitter:label2" content="More items" />
				<meta name="twitter:data2" content="3 minutes" />
			</Head>
			<div
				style={{
					backgroundColor:
						kioskCover.length !== 0 &&
						`${kioskCover[0].kioskCover.color}`,
				}}
				className="home-wrapper">
				{kioskCover.length !== 0 && (
					<Image
						className={"home-wrapper-image"}
						layout="fill"
						objectFit="cover"
						src={kioskCover[0].kioskCover.url}
					/>
				)}
			</div>
			<div className="home-screen-size-wrapper">
				<SelectChoice
					seteditclose={seteditclose}
					editclose={editclose}
					data={data}
				/>
				<ACart />
				<CartOverlay />
				<DetailsOverlay />
				<PayOverlay />
				<ErrorPlate
					timeOut="750"
					EnterAnimate="BounceIn"
					ExitAnimate="BounceOut"
					detailsError={reglocerror}
					ErrMessage="Please select your city/town"
				/>{" "}
				<ErrorPlate
					timeOut="750"
					EnterAnimate="BounceIn"
					ExitAnimate="BounceOut"
					detailsError={regionerror}
					ErrMessage="Please select your region/state"
				/>
				<ErrorPlate
					timeOut="750"
					EnterAnimate="BounceIn"
					ExitAnimate="BounceOut"
					detailsError={phoneerror}
					ErrMessage="
					Please provide phone number
		"
				/>
				<ErrorPlate
					timeOut="750"
					EnterAnimate="BounceIn"
					ExitAnimate="BounceOut"
					detailsError={addproducterror}
					ErrMessage="Select a size and a color"
				/>
				<ErrorPlate
					timeOut="750"
					EnterAnimate="BounceIn"
					ExitAnimate="BounceOut"
					detailsError={stockover1}
					ErrMessage="Limit reached for this product"
				/>
				<ErrorPlate
					timeOut="750"
					EnterAnimate="BounceIn"
					ExitAnimate="BounceOut"
					detailsError={stockover}
					ErrMessage="Out of stock"
				/>
				<ErrorPlate
					timeOut="750"
					EnterAnimate="BounceIn"
					ExitAnimate="BounceOut"
					detailsError={cartnotempty}
					ErrMessage="Add product to cart"
				/>
				<div className="each-button-wrapper">
					<div className="each-product-button-wrapper">
						<button>
							<a
								href={`https://wa.me/233501387484/?text=${pageurl}`}>
								<ShopWhat iwidth="30" iheight="30" />
							</a>
						</button>
						<button onClick={shareLink}>
							<Share iwidth="30" iheight="30" />
						</button>
					</div>
				</div>
				<div id="top" className="home-screen-size-container">
					<div className="eachproduct-wrapper">
						<div className="eachproduct-header">
							<div className="eachproduct-back-to-home">
								<button className="eachproduct-back-to-home-button">
									<i className="eachproduct-back-to-home-button-angle">
										<AngleLeft iwidth="20" iheight="20" />
									</i>
									<Link href="/">a</Link>
								</button>
							</div>
							<span className="eachprooduct-header-brand-name">
								<p>{kioskName[0].name}</p>
							</span>
						</div>
					</div>
					<div className="eachproduct-images-wrapper">
						<div
							ref={node}
							className="
                        eachproduct-images-container">
							{Object.keys(data.productsImages).map((b, i) => (
								<div
									style={{
										backgroundColor: `${data.productsImages[b].color}`,
									}}
									className="eachproduct-each-image"
									key={i}>
									<div
										style={{
											color: ColorBrightness(
												data.productsImages[b].color
											)
												? "white"
												: "black",
										}}
										className="each-image-slide-arrow">
										<ArrowLeft
											iheight="9" iwidth="9"
											color={
												ColorBrightness(
													data.productsImages[b].color
												)
													? "white"
													: "black"
											}
										/>
										<i>swipe</i>
										<ArrowRight iheight="14" iwidth="14"
										color={
											ColorBrightness(
												data.productsImages[b].color
											)
												? "white"
												: "black"
										}
										/>
									</div>
									<img
										onError={(e) =>
											(e.target.style.display = "none")
										}
										src={data.productsImages[b].url}
										alt={data.name}
									/>
								</div>
							))}
						</div>
					</div>
					<div className="eachproduct-name-wrapper">
						<div className="eachproduct-add-cart-container">
							<button onClick={() => CheckVariant(data.id)}>
								<ShopBag
									iwidth="24"
									iheight="24"
									color="white"
								/>
								<p>Add to cart</p>
							</button>
						</div>
					</div>
					<div className="eachproduct-name-wrapper">
						<div className="eachproduct-name-container">
							<p className="eachproduct-product-name">
								{data.name.charAt(0).toUpperCase()}
								{data.name.substring(1)}
							</p>
						</div>
					</div>
					<div className="eachproduct-price-wrapper">
						<div className="eachproduct-price-container">
							<span
								style={{
									backgroundColor: `${data.productsImages.image1.color}`,
									color: ColorBrightness(
										data.productsImages.image1.color
									)
										? "black"
										: "white",
								}}
								className="eachproduct-discounted-price">
								<p>GHC {data.oldprice}.00</p>
							</span>
							<span className="eachproduct-previous-price">
								<p>
									GHC {""}
									{Number(data.oldprice) +
										Number(data.discount)}
									.100
								</p>
							</span>
						</div>
					</div>
					<div className="eachproduct-variant-wrapper">
						<div className="eachproduct-variant-container">
							<p className="eachproduct-variant-head">Variants</p>
							<div className="eachproduct-variant-size-wrapper ">
								<p className="eachproduct-variant-size-head">
									Size
								</p>
								<div className="eachproduct-all-sizes-wrapper">
									{data.picksize.map((ps) => (
										<span
											key={ps.id}
											className="eachproduct-size">
											<p className="eachproduct-size-number">
												{ps.size}
											</p>
											{/* <button className="eachproduct-size-add-button">
												<i className="fa fa-plus"></i>
											</button> */}
										</span>
									))}
								</div>
							</div>
							<div className="eachproduct-variant-color-wrapper ">
								<p className="eachproduct-variant-color-head">
									Color
								</p>
								<div className="eachproduct-all-colors-wrapper">
									{data.pickcolor.map((pc) => (
										<span
											key={pc.id}
											style={{
												backgroundColor: `${pc.color}`,
											}}
											className="eachproduct-color">
											<p className="eachproduct-color-number"></p>
											{/* <button className="eachproduct-color-add-button">
												<i className="fa fa-plus"></i>
											</button> */}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="eachproduct-description-wrapper">
						<div className="eachproduct-description-container">
							<span className="eachproduct-description-head">
								<p>Description</p>
							</span>
							<span className="eachproduct-description-details">
								<p>
									{data.description}
									{/* Qruy bags are among the classic bagsused by
									proffessionals.They are durable and
									affordable */}
								</p>
							</span>
						</div>
					</div>
					<div className="eachproduct-product-viewed-wrapper">
						<span className="eachproduct-viewedproducts-header">
							<p
								onClick={() => {
									window.localStorage.removeItem(
										"vieweditems"
									);
									setgetviewedproducts([]);
								}}>
								Products you have viewed
							</p>
						</span>
						<ViewedProducts />
					</div>
					<Footer KioskSocialLinks={KioskSocialLinks} />
				</div>
			</div>
		</>
	);
};

export default EachProduct;
