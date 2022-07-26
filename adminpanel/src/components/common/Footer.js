import React, { useEffect, useState, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Analytics, Cog, PaperPlane, ShopBag } from "./icons/Icons";

import KioskCluster from "./KioskCluster";

const Footer = () => {
	const location = useLocation();

	const active = {
		// borderBottom: " 3px solid var(--ActiveUnderline)",
		color: "rgb(245, 243, 245)",
	};

	const [showani, setshowani] = useState(null);
	const [prevScrollpos, setprevScrollpos] = useState();

	const BottomNavScroll = useCallback(() => {
		let currentScrollPos = window.pageYOffset;
		if (prevScrollpos > currentScrollPos) {
			setshowani(true);
		} else {
			if (window.pageYOffset < 3) return;
			setshowani(false);
		}
		setprevScrollpos(currentScrollPos);
	}, [prevScrollpos]);

	useEffect(() => {
		setprevScrollpos(window.pageYOffset);
		window.addEventListener("scroll", BottomNavScroll);
		return () => {
			window.removeEventListener("scroll", BottomNavScroll);
		};
	}, [BottomNavScroll]);

	// useCallback(() => {
	//   first;
	// }, [second]);

	return (
		<>
			<div
				className={`footer-bottom-navbar ${
					showani === true
						? "slideUp"
						: showani === false
						? "slideDown"
						: ""
				}`}>
				<div className="footer-bottom-container">
					<div className="bottom-nav-all-routes">
						<span
							style={{
								backgroundColor:
									location.pathname === "/"
										? "#c3bebe33"
										: "",
							}}
							className="footer-route-wrapper">
							<NavLink
								to="/"
								style={({ isActive }) =>
									isActive || location.pathname === "/"
										? active
										: {}
								}
								className="bottom-nav-each-route">
								<i>
									<Analytics
										iwidth="20"
										iheight="20"
										color={
											location.pathname === "/"
												? "rgb(245, 243, 245)"
												: "#9b9b9b"
										}
									/>
								</i>
							</NavLink>
						</span>
						<span
							style={{
								backgroundColor:
									location.pathname === "/displayproduct"
										? "#c3bebe33"
										: "",
							}}
							className="footer-route-wrapper">
							<NavLink
								to="/displayproduct"
								style={({ isActive }) =>
									isActive ? active : {}
								}
								className="bottom-nav-each-route">
								<i>
									
									<ShopBag
										iwidth="20"
										iheight="20"
										color={
											location.pathname === "/displayproduct"
												? "rgb(245, 243, 245)"
												: "#9b9b9b"
										}
									/>
								</i>
							</NavLink>
						</span>

						<span
							style={{
								backgroundColor:
									location.pathname === "/order"
										? "#c3bebe33"
										: "",
							}}
							className="footer-route-wrapper">
							<NavLink
								to="/order"
								className="bottom-nav-each-route"
								style={({ isActive }) =>
									isActive ? active : {}
								}>
								<i>
									<PaperPlane
										iwidth="23"
										iheight="23"
										color={
											location.pathname === "/order"
												? "rgb(245, 243, 245)"
												: "#9b9b9b"
										}
									/>
								</i>
							</NavLink>
						</span>

						<span 
						style={{
							backgroundColor:
								location.pathname === "/settings"
									? "#c3bebe33"
									: "",
						}}
							className="footer-route-wrapper">
							
							<NavLink
								to="/settings"
								style={({ isActive }) =>
									isActive ? active : {}
								}
								className="bottom-nav-each-route">
							<i>
									<Cog
										iwidth="22"
										iheight="22"
										color={
											location.pathname === "/settings"
												? "rgb(245, 243, 245)"
												: "#9b9b9b"
										}
									/>
								</i>
							</NavLink>
						</span>
					</div>
				</div>
			</div>

			<div className="footer-wrapper">
				<div className="footer-container">
					<div className="footer-relevant-links">
						<Link to="/">
							<p>Kiosk Cluster</p>
						</Link>
						<Link to="/">
							<p>Terms</p>
						</Link>
						<Link to="/">
							<p>About</p>
						</Link>
					</div>
					<div className="footer-kioskcluster-logo">
						<span>
							<KioskCluster />
						</span>
						<span className="footer-kioskcluster-name">
							<p>Kiosk Cluster</p>
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
// console.log(
// 	Number(
// 		window
// 			.getComputedStyle(
// 				document.querySelector( " .slideDown")
// 			)
// 			.getPropertyValue("top")
// 			.replace("px", "")
// 	) + 10
// );
// console.log(
// 	document.querySelector(" .slideDown").getBoundingClientRect()
// 		.top
// );

// if (
// 			document
// 				.querySelector(" .footer-bottom-navbar")
// 				.getBoundingClientRect().top > 700.3333
// 		) {
// 			document.querySelector(" .footer-bottom-navbar").style.display =
// 				"none";
// 		}
// if (
// 	document
// 		.querySelector(" .footer-bottom-navbar")
// 		.getBoundingClientRect().top > 700.3333
// ) {
// 	document.querySelector(" .footer-bottom-navbar").style.display =
// 		"none";
// }
