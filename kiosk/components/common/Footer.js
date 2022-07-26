import React, { useContext } from "react";
import { MyContext } from "../contextapi/MyProvider";
import AboutOverlay from "../overlay/AboutOverlay";
import PrivacyOverlay from "../overlay/PrivacyOverlay";
import { Facebook, Instagram, Twitter, WhatsApp } from "./icons/Icons";
import KioskCluster from "./KioskCluster";
import SocialMedia from "./SocialMedia";

const Footer = ({		KioskSocialLinks}) => {
	const { setopenabout, setopenprivacy } = useContext(MyContext);
	const fdate = new Date();
	let fyear = fdate.getFullYear();
	return (
		<>
			<AboutOverlay />
			<PrivacyOverlay />
			<div className="footer-wrapper">
				<div className="footer-container">
					<div className="footer-links-wrapper">
						<p
							onClick={() => {
								setopenabout(true);
							}}
							className="footer-link1">
							About
						</p>
						<p
							onClick={() => {
								setopenprivacy(true);
							}}
							className="footer-link2">
							Terms
						</p>
					</div>
					<SocialMedia KioskSocialLinks={ 		KioskSocialLinks }/>
					<div className="footer-kiosk-details">
						<span className="footer-kiosk-detail-container">
							<p>
								This content or product is neither created nor
								endorsed by Kiosk Cluster
							</p>
							<KioskCluster />
						</span>
					</div>
					<div className="footer-meta">
						<div className="copyright">
							<p className="p11">
								Copyright © 2021 -<span>{fyear}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
