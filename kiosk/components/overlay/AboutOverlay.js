import React, { useContext, useRef } from "react";
import { MyContext } from "../contextapi/MyProvider";
import Image from "next/image";
import logo from "../images/logo512.png";
import AnimateTransition from "../common/AnimateTransition";
import { IClose } from "../common/icons/Icons";
import SocialMedia from "../common/SocialMedia";

const AboutOverlay = () => {
	const { openabout, setopenabout, getabout, getlogo } =
		useContext(MyContext);
	const nodeRef = useRef();

	return (
		<>
			<AnimateTransition
				promptWrapeprClassName="yes"
				timeOut="300"
				EnterAnimate="slideInUp"
				ExitAnimate="slideOutDown"
				detailsError={openabout}
				nodeRef={nodeRef}>
				<div ref={nodeRef} className="cartoverlay-wrapper">
					<div className="cartoverlay-container">
						<div className="cartoverlay-close-wrapper">
							<button
								onClick={() => setopenabout(false)}
								className="overlay-close-container">
								<IClose iwidth="20" iheight="20" />
							</button>
						</div>
						<div className="aboutoverlay-brand-logo">
							<span className="aboutovelay-brand-logo-circle">
								<img
									style={{
										borderRadius: "10px",
										backgroundColor:
											getlogo[0] &&
											getlogo[0].kioskDashLogo.color,
									}}
									onError={(e) => {
										e.target.style.display = "none";
									}}
									src={
										getlogo[0] &&
										getlogo[0].kioskDashLogo.url
									}
									width={60}
									height={60}
									// border-radius={5}
									alt=""
								/>
							</span>
						</div>
						<div className="aboutoverlay-brand-story">
							<span className="aboutoverlay-brand-story-header">
								<h3> About Granddies</h3>
							</span>
							<p className="about">
								{getabout.length !== 0 && getabout[0].content}
							</p>
						</div>
						<div className="aboutoverlay-s-handle-wrapper">
							<SocialMedia />
						</div>
					</div>
				</div>
			</AnimateTransition>
		</>
	);
};

export default React.memo(AboutOverlay);
