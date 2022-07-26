import React, { useRef, useState } from "react";
import AnimateTransition from "../common/AnimateTransition";
import Loader from "../common/Loader";
import { useDeleteSomething } from "../util/delete-something";

const DeleteCatalog = ({ deleteclose, setdeleteclose, deleteinfo,collection,folder }) => {
	const nodeRef = useRef();
	const [delonload, setdelonload] = useState(false);
	const [deleteDetails] = useDeleteSomething();
	// console.log(deleteinfo)
	return (
		<>
			<AnimateTransition
				promptWrapeprClassName="yes"
				timeOut="300"
				EnterAnimate="ZoomInUp"
				ExitAnimate="ZoomOutDown"
				detailsError={deleteclose}
				nodeRef={nodeRef}>
				<div ref={nodeRef} className="deletecatalog-wrapper">
					<div className="deletecatalog-container">
						<span className="deletecatalog-header">
							<p>Are you sure you want delete the product?</p>
						</span>
						<div className="deletecatalog-button-wrapper">
							<span className="deletecatalog-button-container1">
								<button onClick={() => setdeleteclose(false)}>
									Discard
								</button>
							</span>
							<span className="deletecatalog-button-container2">
								<button
									onClick={() =>
										deleteDetails(
											Object.values(deleteinfo)[0],
											Object.values(deleteinfo)[1],
											Object.values(deleteinfo)[2],
											setdelonload,
											setdeleteclose,
										collection,folder
										)
									}>
									{delonload === false ? (
										"Delete"
									) : (
										<div
											style={{
												width: "50px",
												height: "100%",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												overflow: "hidden",
											}}>
											<Loader
												cwidth="15px"
												cheight="15px"
											/>
										</div>
									)}
								</button>
							</span>
						</div>
					</div>
				</div>
			</AnimateTransition>
		</>
	);
};

export default React.memo(DeleteCatalog)
