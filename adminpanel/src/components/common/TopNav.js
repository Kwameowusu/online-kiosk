import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import group30 from "../images/Group30.png";
// import profile from "../images/profile.jpg";
import { NetworkPlate } from "./ErrorPlate";
import { getAuth } from "firebase/auth";
import { MyContext } from "../../contextapi/MyProvider";
import { Analytics, Cog, PaperPlane, ShopBag } from "./icons/Icons";
import react from "react";

const TopNav = () => {
	const { adminDetails, setadminDetails, kiosklogo } = useContext(MyContext);

	const location = useLocation();
	const active = {
		borderBottom: " 2px solid var(--ActiveUnderline)",
	};
	// console.log(kiosklogo)
	const loginActive = {
		backgroundColor: " var(--ActiveUnderline)",
		width: "32px",
		height: "32px",
	};
	const auth = getAuth();

	useEffect(() => {
		const user = auth.currentUser;

		if (user !== null) {
			user.providerData.forEach((profile) => {
				localStorage.setItem(
					"admindetails",
					JSON.stringify({
						name: profile.displayName,
						email: profile.email,
						photoURL: profile.photoURL,
					})
				);
			});
		}
	}, [auth.currentUser, setadminDetails]);

	return (
		<>
			<div className="topnav-wrapper">
				<div className="topnav-menu-wrapper">
					<NetworkPlate
						promptClassName="networkplate-container"
						timeOut="750"
						EnterAnimate="SlideInDown"
						ExitAnimate="SlideOutUp"
						detailsError={
							window.navigator.onLine === true ? false : true
						}
					/>
					<div className="topnav-brand-admin-wrapper">
						<span className="topnav-brand-logo">
							<img
								style={{
									backgroundColor:
										kiosklogo[0] &&
										kiosklogo[0].kioskDashLogo.color,
								}}
								onError={(e) => {
									e.target.style.display = "none";
								}}
								src={
									kiosklogo[0] &&
									kiosklogo[0].kioskDashLogo.url
								}
								alt=""
							/>

							{
								<p className="kioskname">
									{localStorage.getItem("kioskname")}
								</p>
							}
						</span>
						<span className="topnav-admin-profile">
							<span className="topnav-admin-details">
								{adminDetails ? (
									<p>{adminDetails.name} </p>
								) : (
									""
								)}
								<small>Admin</small>
							</span>
							<NavLink
								style={({ isActive }) =>
									isActive ? loginActive : {}
								}
								to="/settings/updatelogins"
								className="topnav-admin-profile-img">
								{adminDetails ? (
									<img
										src={adminDetails.photoURL}
										onError={(e) =>
											(e.target.style.display = "none")
										}
										alt=""
									/>
								) : (
									""
								)}
							</NavLink>
						</span>
					</div>
				</div>
				<div className="topnav-routes-wrapper">
					<div className="topnav-routes-container">
						<div className="topnav-all-routes">
							<NavLink
								to="/"
								style={({ isActive }) =>
									isActive || location.pathname === "/insight"
										? active
										: {}
								}
								className="topnav-each-route">
								<Analytics
									iwidth="15"
									iheight="15"
									// color="rgb(245, 243, 245)"
								/>

								<p>Insight</p>
							</NavLink>
							<NavLink
								to="/displayproduct"
								style={({ isActive }) =>
									isActive ? active : {}
								}
								className="topnav-each-route">
								<ShopBag iwidth="15" iheight="15" />
								<p>Product management</p>{" "}
							</NavLink>
							<NavLink
								to="/order"
								className="topnav-each-route"
								style={({ isActive }) =>
									isActive ? active : {}
								}>
								<PaperPlane iwidth="20" iheight="20" />
								<p>Order</p>{" "}
							</NavLink>

							<NavLink
								to="/settings"
								style={({ isActive }) =>
									isActive ? active : {}
								}
								className="topnav-each-route cog">
								<Cog iwidth="22" iheight="22" />
								<p>Settings</p>{" "}
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default react.memo(TopNav);
