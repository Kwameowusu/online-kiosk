import React from "react";
import Footer from "../common/Footer";
import TopNav from "../common/TopNav";
import Allsettings from "./Allsettings";
import EachSettings from "./eachsetting/EachSettings";
import { NavLink, useLocation } from "react-router-dom";
import { DotsVertical } from "../common/icons/Icons";
const Settings = () => {
	let location = useLocation();

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					height: "100vh",
				}}>
				<TopNav />
				<div className="deliverycoverage-dropdown-wrapper-outer1">
					<div
						style={{
							display: "flex",
							marginTop: "5px",
							width: "95%",
						}}>
						<div className="deliverycoverage-dropdown-wrapper">
							<button>
							<DotsVertical
									iwidth='16'
									iheight='16'
								/>
							</button>
							<div className="deliverycoverage-dropdown-container">
								<div className="deliverycoverage-dropdown-container-header">
									<p>All settings</p>
								</div>
								<div className="deliverycoverage-dropdown-routes-wrappper">
									<NavLink
										to=""
										className="deliverycoverage-dropdown-each-route-wrapper">
										<div className="deliverycoverage-dropdown-isactive-wrapper">
											{(location.pathname ===
												"/settings" ||
												location.pathname ===
													"/settings/") && (
												<span className="deliverycoverage-dropdown-isactive"></span>
											)}
										</div>

										<span className="deliverycoverage-dropdown-each-route-container">
											<p>Appearance</p>
										</span>
									</NavLink>{" "}
									<NavLink
										to="deliverage"
										className="deliverycoverage-dropdown-each-route-wrapper">
										<div className="deliverycoverage-dropdown-isactive-wrapper">
											{location.pathname ===
												"/settings/deliverage" && (
												<span className="deliverycoverage-dropdown-isactive"></span>
											)}
										</div>

										<span className="deliverycoverage-dropdown-each-route-container">
											<p>Delivery coverage</p>
										</span>
									</NavLink>{" "}
									<NavLink
										to="deliveryfees"
										className="deliverycoverage-dropdown-each-route-wrapper">
										<div className="deliverycoverage-dropdown-isactive-wrapper">
											{location.pathname ===
												"/settings/deliveryfees" && (
												<span className="deliverycoverage-dropdown-isactive"></span>
											)}
										</div>

										<span className="deliverycoverage-dropdown-each-route-container">
											<p>Delivery fees</p>
										</span>
									</NavLink>{" "}
									<NavLink
										to="uploadbanner"
										className="deliverycoverage-dropdown-each-route-wrapper">
										<div className="deliverycoverage-dropdown-isactive-wrapper">
											{location.pathname ===
												"/settings/uploadbanner" && (
												<span className="deliverycoverage-dropdown-isactive"></span>
											)}
										</div>

										<span className="deliverycoverage-dropdown-each-route-container">
											<p>Upload banner</p>
										</span>
									</NavLink>
									<NavLink
										to="brands"
										className="deliverycoverage-dropdown-each-route-wrapper">
										<div className="deliverycoverage-dropdown-isactive-wrapper">
											{location.pathname ===
												"/settings/brands" && (
												<span className="deliverycoverage-dropdown-isactive"></span>
											)}
										</div>

										<span className="deliverycoverage-dropdown-each-route-container">
											<p>Brands</p>
										</span>
									</NavLink>{" "}
									<NavLink
										to="privacy"
										className="deliverycoverage-dropdown-each-route-wrapper">
										<div className="deliverycoverage-dropdown-isactive-wrapper">
											{location.pathname ===
												"/settings/privacy" && (
												<span className="deliverycoverage-dropdown-isactive"></span>
											)}
										</div>

										<span className="deliverycoverage-dropdown-each-route-container">
											<p>Privacy</p>
										</span>
									</NavLink>
									<NavLink
										to="about"
										className="deliverycoverage-dropdown-each-route-wrapper">
										<div className="deliverycoverage-dropdown-isactive-wrapper">
											{location.pathname ===
												"/settings/about" && (
												<span className="deliverycoverage-dropdown-isactive"></span>
											)}
										</div>

										<span className="deliverycoverage-dropdown-each-route-container">
											<p>About</p>
										</span>
									</NavLink>
									<NavLink
										to="updatelogins"
										className="deliverycoverage-dropdown-each-route-wrapper">
										<div className="deliverycoverage-dropdown-isactive-wrapper">
											{location.pathname ===
												"/settings/updatelogins" && (
												<span className="deliverycoverage-dropdown-isactive"></span>
											)}
										</div>

										<span className="deliverycoverage-dropdown-each-route-container">
											<p>Login Details</p>
										</span>
									</NavLink>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="settings-wrapper">
					<div className="settings-container-outer">
						<div className="settings-container">
							<div className="settings-container-inner">
								<Allsettings />
								<EachSettings />
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Settings;
