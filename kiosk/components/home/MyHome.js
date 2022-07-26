import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Footer from "../common/Footer";
import Catalog from "./Catalog";
import KioskIcon from "../common/KioskIcon";
import Search from "../common/Search";
import { ErrorPlate } from "../common/PromptPlate";
import { MyContext } from "../contextapi/MyProvider";
import ACart from "../common/ACart";
import Head from "next/head";
import { AngleDown, AngleUp, ISearch } from "../common/icons/Icons";

const MyHome = ({
	allproducts,
	kioskName,
	kioskBanner,
	kioskCover,
	kioskAbout,
	kioskTheme,
	CatOrientation,
	Kioskvericode,
	productCategory,
	KioskSocialLinks,
}) => {
	// console.log(kioskName[0].name)

	const [dsearch, setdsearch] = useState(false);
	// const [pageurl, setpageurl] = useState("");
	const {
		addproducterror,
		stockover,
		stockover1,
		cartnotempty,
		phoneerror,
		regionerror,
		reglocerror,
		setopenpay,
		apay,
		getbrands,
		setsearch,
		// kioskbanner,
	} = useContext(MyContext);
	const node = useRef();
	// const route = useRouter().asPath;
	// console.log(route)
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

	useEffect(() => {}, []);

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
		}, 3900);
	}, []);

	useEffect(() => {
		if (apay.apay === "yes") {
			setopenpay(true);
		}
	}, [apay]);

	const PickSearchCat = (a) => {
		setsearch(a);
	};

	const [scroll, setscroll] = useState(true);
	useEffect(() => {
		window.onscroll = function () {
			myFunction();
		};

		function myFunction() {
			if (
				document.body.scrollTop > 50 ||
				document.documentElement.scrollTop > 50
			) {
				setscroll(false);
			} else if (
				document.body.scrollTop < 50 ||
				document.documentElement.scrollTop < 50
			) {
				setscroll(true);
			}
		}
	}, [scroll]);

	return (
		<>
			{kioskName.length !== 0 &&
			kioskAbout.length !== 0 &&
			kioskBanner.length !== 0 &&
			Kioskvericode !== 0 ? (
				<Head>
					<title>{kioskName[0].name} </title>
					<link
						rel="canonical"
						href={`https://oskdark.vercel.app/`}
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
						content={`https://oskdark.vercel.app/`}
					/>
					<meta property="og:type" content="E-commerce" />
					<meta property="og:article:section" content="Granddies" />
					<meta property="og:title" content={kioskName[0].name} />
					<meta
						property="og:description"
						content={kioskAbout[0].content}
					/>

					<meta
						property="og:image"
						content={kioskBanner[0].kioskBanner.url}
					/>
					<meta
						property="og:image:secure_url"
						content={kioskBanner[0].kioskBanner.url}
					/>
					<meta property="og:image:width" content="1079" />
					<meta property="og:image:height" content="970" />
					<meta
						property="og:image:alt"
						content={kioskAbout[0].content}
					/>

					<meta property="og:site_name" content="Granddies kiosk" />

					<meta
						property="article:published_time"
						content="2021-11-21T21:52:10+00:00"
					/>
					<meta
						property="article:modified_time"
						content="2021-11-21T21:52:17+00:00"
					/>

					<meta name="twitter:title" content={kioskName[0].name} />
					<meta
						name="twitter:description"
						content={kioskAbout[0].content}
					/>
					<meta
						name="twitter:image"
						content={kioskBanner[0].kioskBanner.url}
					/>

					<meta property="article:author" content="@B_Owusu_kwame" />
					<meta name="twitter:site" content="@kioskcluster" />
					<meta name="twitter:card" content="summary_large_image" />
					<meta
						property="twitter:domain"
						content={`https://oskdark.vercel.app/`}
					/>
					<meta
						property="twitter:url"
						content={`https://oskdark.vercel.app/`}
					/>

					<meta name="twitter:label1" content="Posted by" />
					<meta name="twitter:data1" content="Granddies" />
					<meta name="twitter:label2" content="More items" />
					<meta name="twitter:data2" content="3 minutes" />
				</Head>
			) : (
				""
			)}
			<div
				style={{
					backgroundColor:
						kioskCover.length !== 0 ??
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
			<ACart />

			<div className="home-screen-size-wrapper">
				{!scroll ? (
					<a href="#top" className="Back-to-top">
						<AngleUp iheight="20" iwidth="20" />
						
					</a>
				) : (
					""
				)}
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
					ErrMessage="Select variant"
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
				<div id="top" className="home-screen-size-container">
					<div className="home-brand-name-wrapper">
						<div className="home-brand-name-container">
							{dsearch ? <Search setdsearch={setdsearch} /> : ""}

							<span className="home-brand-name">
								<p>{kioskName[0].name}</p>
							</span>
							<span className="home-search-button-wrapper">
								<button
									onClick={() => setdsearch(true)}
									className="home-search-button">
									<ISearch iwidth="20" iheight="20" />
									{/* <Instagram/> */}
								</button>
							</span>
						</div>
					</div>
					<div className="home-promotional-banner-wrapper">
						<div
							ref={node}
							className="home-promotional-banner-container">
							{kioskBanner.map((b) => (
								<div
									style={{
										backgroundColor: `${b.kioskBanner.color}`,
									}}
									key={b.banid}
									className="home-each-promo-banner-wrapper">
									<Image
										// width={500}
										// height={500}
										src={b.kioskBanner.url}
										objectFit="fill"
										layout="fill"
									/>
								</div>
							))}
						</div>
					</div>
					<div className="home-brands-category-wrapper">
						<div className="home-promotional-brands-wrapper">
							<div className="home-promotional-brands-container">
								<div className="home-brands-selling-brands-fading">
									<button
										onClick={() => setsearch()}
										className="home-brands-selling-brands-name">
										<p>brands</p>
									</button>
									<div className="home-brands-selling-brands-dropdown">
										{getbrands.map((b) => (
											<span
												key={b.id}
												className="home-brands-selling-brands-inner-name">
												<p>{b.name}</p>
											</span>
										))}
									</div>
								</div>
							</div>
							<div className="home-categories-wrapper">
								<div className="home-categories-container">
									{productCategory.map((d) => (
										<button
											onClick={() =>
												PickSearchCat(d.name)
											}
											key={d.id}
											className="home-category-pill">
											{d.name}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className="content-wrapper">
						{allproducts.length === 0 ? (
							<div className="content-empty-wrapper">
								<div className="content-empty-container">
									<KioskIcon />

									<p className="content-empty-container-text">
										Empty Kiosk{" "}
									</p>
								</div>
							</div>
						) : (
							<Catalog
								CatOrientation={CatOrientation}
								allproducts={allproducts}
							/>
						)}
					</div>
					<Footer KioskSocialLinks={KioskSocialLinks} />
				</div>
			</div>
		</>
	);
};

export default MyHome;
