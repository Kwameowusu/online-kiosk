import React from "react";
import { Outlet } from "react-router-dom";

const EachSettings = () => {
	return (
		<>
			<div className="eachsetting-wrapper">
				{/* <div> */}
					<Outlet />
				{/* </div> */}
			</div>
		</>
	);
};

export default EachSettings;
