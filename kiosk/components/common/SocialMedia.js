import React from "react";
import { Facebook, Instagram, Twitter, WhatsApp } from "./icons/Icons";

const SocialMedia = ({ KioskSocialLinks }) => {
	return (
		<>
			<div className="s-handle-wrapper">
				<div className="s-handle-container">
					<div className="all-handles">
						<div className="handle-cont">
							<a
								href={
									KioskSocialLinks &&
									KioskSocialLinks[0].twitter
								}>
								<Twitter iheight="18" iwidth="18" />
							</a>
						</div>
						<div className="handle-cont">
							<a
								href={
									KioskSocialLinks &&
									KioskSocialLinks[0].facebook
								}>
								<Facebook iheight="18" iwidth="18" />
							</a>
						</div>
						<div className="handle-cont">
							<a
								href={
									KioskSocialLinks &&
									KioskSocialLinks[0].whatsapp
								}>
								<WhatsApp iheight="18" iwidth="18" />
							</a>
						</div>
						<div className="handle-cont">
							<a
								href={
									KioskSocialLinks &&
									KioskSocialLinks[0].instagram
								}>
								<Instagram iheight="18" iwidth="18" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SocialMedia;
