import React, { useState, Children } from "react";
import { AnimateTransitionGroup } from "../../common/AnimateTransitionGroup";
import { uinqId } from "../../util/uniqid";

const AddSize = ({ setpicksize, picksize }) => {
	console.log("kkkkkkk");

	const [asize, setasize] = useState();

	const [getanimate, outanimate, clearoutanimate] = AnimateTransitionGroup(
		picksize,
		setpicksize,
		setasize
	);

	const addSize = (e) => {
		e.preventDefault();
		console.log(picksize);
		if (asize === undefined || asize === "") return;
		getanimate({
			id: uinqId(),
			size: asize,
			isChecked: false,
			animationDuration: "300ms",
			animationName: "BounceIn",
		});
	};

	const deleteSize = (id) => {
		outanimate(id, "BounceOut", 300);
	};
	return (
		<>
			<div className="addproduct-input-choice">
				<div className="addproduct-choice-category">
					<p>Size</p>
				</div>
				<div className="addproduct-choice-input">
					<input
						onChange={(e) => setasize(e.target.value)}
						type="text"
						value={asize || ""}
						placeholder="Enter product size"
					/>
					<button onClick={addSize} type="submit">
						<p>Add</p>
					</button>
					<span className="addproduct-size-choice-clear">
						<p onClick={() => clearoutanimate("BounceOut", 300)}>
							Clear
						</p>
					</span>
				</div>
				<div className="addproduct-choice-input-sizes">
					{Children.toArray(
						[
							...new Map(
								picksize.map((item) => [item.size, item])
							).values(),
						]
							.filter((b) => {
								if (b.size !== "") {
									return b;
								}
								return "";
							})

							.map((s) => (
								<span
									style={{
										animationDuration: `${s.animationDuration}`,
										animationName: `${s.animationName}`,
									}}
									className={`addproduct-choice-input-sizes-container `}>
									<p>{s.size}</p>
									<span onClick={() => deleteSize(s.id)}>
										<i className="la la-times"></i>
									</span>
								</span>
							))
					)}
				</div>
			</div>
		</>
	);
};

export default React.memo(AddSize);
