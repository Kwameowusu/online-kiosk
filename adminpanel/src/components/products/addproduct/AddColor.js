import React, { useState, Children } from "react";
import { AnimateTransitionGroup } from "../../common/AnimateTransitionGroup";
import { uinqId } from "../../util/uniqid";

const AddColor = ({ setpickcolor, pickcolor }) => {
	const [acolor, setacolor] = useState();
	// const [pickcolor, setpickcolor] = useState([]);
	const [getanimate, outanimate, clearoutanimate] = AnimateTransitionGroup(
		pickcolor,
		setpickcolor,
		setacolor
	);

	const addColor = (e) => {
		e.preventDefault();

		if (acolor === undefined || acolor === "") return;
		getanimate({
			id: uinqId(),
			color: acolor,
			isChecked: false,
			animationDuration: "300ms",
			animationName: "SlideInDown",
		});
	};

	const deleteColor = (id) => {
		outanimate(id, "SlideOutDown", 300);
	};
	return (
		<>
			<div className="addproduct-input-choice">
				<div className="addproduct-choice-category">
					<p>Color</p>
				</div>
				<div className="addproduct-choice-input">
					<input
						onChange={(e) => setacolor(e.target.value)}
						type="color"
					/>
					<button onClick={addColor} type="submit">
						<p>Add</p>
					</button>
					<span className="addproduct-color-choice-clear">
						<p onClick={() => clearoutanimate("SlideOutDown", 300)}>
							clear
						</p>
					</span>
				</div>
				<div className="addproduct-choice-input-colors">
					{Children.toArray(
						[    
							...new Map(
								pickcolor.map((item) => [item.color, item])
							).values(),
						]
							.filter((b) => {
								if (b.color !== "") {
									return b;
								}
								return "";
							})

							.map((c) => (
								<span
									className="addproduct-choice-input-colors-container"
									style={{
										backgroundColor: `${c.color}`,
										animationDuration: `${c.animationDuration}`,
										animationName: `${c.animationName}`,
									}}>
									<span onClick={() => deleteColor(c.id)}>
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

export default React.memo(AddColor);
