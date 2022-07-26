import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Allsettings = () => {
	const location = useLocation();

	return (
		<>
			<div className="allsettings-wrapper">
				<div>
					<div className="allsettings-container">
						<div className="allsettings-container-header">
							<p>All settings</p>
						</div>
						<div className="allsettings-routes-wrappper">
							<NavLink
								to=""
								className="allsettings-each-route-wrapper">
								<div className="allsettings-isactive-wrapper">
									{location.pathname === "/settings" && (
										<span className="allsettings-isactive"></span>
									)}
								</div>

								<span className="allsettings-each-route-container">
									<p>Appearance</p>
								</span>
							</NavLink>
							<NavLink
								to="deliverage"
								className="allsettings-each-route-wrapper">
								<div className="allsettings-isactive-wrapper">
									{location.pathname ===
										"/settings/deliverage" && (
										<span className="allsettings-isactive"></span>
									)}
								</div>

								<span className="allsettings-each-route-container">
									<p>Delivery coverage</p>
								</span>
							</NavLink>{" "}
							<NavLink
								to="deliveryfees"
								className="allsettings-each-route-wrapper">
								<div className="allsettings-isactive-wrapper">
									{location.pathname ===
										"/settings/deliveryfees" && (
										<span className="allsettings-isactive"></span>
									)}
								</div>

								<span className="allsettings-each-route-container">
									<p>Delivery fees</p>
								</span>
							</NavLink>
							<NavLink
								to="uploadbanner"
								className="allsettings-each-route-wrapper">
								<div className="allsettings-isactive-wrapper">
									{location.pathname ===
										"/settings/uploadbanner" && (
										<span className="allsettings-isactive"></span>
									)}
								</div>

								<span className="allsettings-each-route-container">
									<p>Upload banner</p>
								</span>
							</NavLink>{" "}
							<NavLink
								to="brands"
								className="allsettings-each-route-wrapper">
								<div className="allsettings-isactive-wrapper">
									{location.pathname ===
										"/settings/brands" && (
										<span className="allsettings-isactive"></span>
									)}
								</div>

								<span className="allsettings-each-route-container">
									<p>Brands</p>
								</span>
							</NavLink>{" "}
							<NavLink
								to="privacy"
								className="allsettings-each-route-wrapper">
								<div className="allsettings-isactive-wrapper">
									{location.pathname ===
										"/settings/privacy" && (
										<span className="allsettings-isactive"></span>
									)}
								</div>

								<span className="allsettings-each-route-container">
									<p>Privacy</p>
								</span>
							</NavLink>
							<NavLink
								to="about"
								className="allsettings-each-route-wrapper">
								<div className="allsettings-isactive-wrapper">
									{location.pathname ===
										"/settings/about" && (
										<span className="allsettings-isactive"></span>
									)}
								</div>

								<span className="allsettings-each-route-container">
									<p>About</p>
								</span>
							</NavLink>
							<NavLink
								to="updatelogins"
								className="allsettings-each-route-wrapper">
								<div className="allsettings-isactive-wrapper">
									{location.pathname ===
										"/settings/updatelogins" && (
										<span className="allsettings-isactive"></span>
									)}
								</div>

								<span className="allsettings-each-route-container">
									<p>Login Details</p>
								</span>
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Allsettings;
