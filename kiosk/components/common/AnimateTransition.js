import React, { useEffect } from "react";

const AnimateTransition = ({
	promptWrapeprClassName,
	EnterAnimate,
	ExitAnimate,
	detailsError,
	timeOut,
	children,
	nodeRef,
}) => {
	
	useEffect(() => {

		if (detailsError === true && promptWrapeprClassName === "yes") {
			// console.log(nodeRef.current.childNodes[0])
			nodeRef.current.classList.remove("promptHideAnimate");
			nodeRef.current.childNodes[0].classList.add(`${EnterAnimate}`);
			nodeRef.current.classList.add(`promptShowAnimate`);
			nodeRef.current.childNodes[0].style.animationDuration =
				Number(timeOut) + "ms";
			setTimeout(() => {
			nodeRef.current.style.backgroundColor = "rgba(72, 72, 72, 0.7)";
			}, Number(timeOut)*0.3);
			
		} else if (detailsError) {
			// console.log(promptWrapeprClassName)
			nodeRef.current.classList.remove("promptHideAnimate");
			nodeRef.current.classList.add(`${EnterAnimate}`);
			nodeRef.current.classList.add(`promptShowAnimate`);
			nodeRef.current.style.animationDuration = Number(timeOut) + "ms";
		}
	}, [detailsError, EnterAnimate, nodeRef, timeOut, promptWrapeprClassName]);
	useEffect(() => {
		if (detailsError === false && promptWrapeprClassName === "yes") {
			nodeRef.current.childNodes[0].classList.remove(`${EnterAnimate}`);
			nodeRef.current.childNodes[0].classList.add(`${ExitAnimate}`);
			nodeRef.current.style.backgroundColor="#1c230e00";

			const timer = setTimeout(() => {
				nodeRef.current.classList.remove(`promptShowAnimate`);
				nodeRef.current.childNodes[0].classList.remove(
					`${ExitAnimate}`
				);
				nodeRef.current.classList.add("promptHideAnimate");
			}, Number(timeOut) * 0.85);
			return () => clearTimeout(timer);



		} else if (detailsError === false) {
			nodeRef.current.classList.remove(`${EnterAnimate}`);
			nodeRef.current.classList.add(`${ExitAnimate}`);

			const timer = setTimeout(() => {
				nodeRef.current.classList.remove(`promptShowAnimate`);
				nodeRef.current.classList.remove(`${ExitAnimate}`);
				nodeRef.current.classList.add("promptHideAnimate");
			}, Number(timeOut) * 0.85);
			return () => clearTimeout(timer);
		}
	}, [
		detailsError,
		EnterAnimate,
		ExitAnimate,
		nodeRef,
		timeOut,
		promptWrapeprClassName,
	]);

	return (
		<>
			<>{children}</>
		</>
	);
};

export default AnimateTransition;
