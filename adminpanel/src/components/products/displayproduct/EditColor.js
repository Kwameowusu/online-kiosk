import React, { useState, Children } from "react";
import { AnimateTransitionGroup } from "../../common/AnimateTransitionGroup";
import { IClose } from "../../common/icons/Icons";
import Loader from "../../common/Loader";
import { uinqId } from "../../util/uniqid";

const EditColor = ({
	setpickcolor,
	pickcolor,
	proid,
	UpdateForm,
	colorload,
}) => {

	const [acolor, setacolor] = useState();

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
		outanimate(id, "SideOutDown", 300);
	};
	return (
		<>
			<div className="editcatalog-update-colors-wrapper">
				<form>
					<div className="editcatalog-update-colors-input-wrapper">
						<input
							onChange={(e) => setacolor(e.target.value)}
							type="color"
							name="color"
							id="price"
							required
							placeholder="Enter color"
						/>
						<button onClick={addColor} type="submit">
							Add
						</button>
						<span className="addproduct-size-choice-clear">
							<p
								onClick={() =>
									clearoutanimate("BounceOut", 300)
								}>
								Clear
							</p>
						</span>
					</div>
					<div className="editcatalog-choice-input-colors-wrapper1">
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

								.map((s) => (
									<span
										style={{
											backgroundColor: `${s.color}`,
											animationDuration: `${s.animationDuration}`,
											animationName: `${s.animationName}`,
										}}
										className={`editcatalog-choice-input-colors-container `}>
										<span onClick={() => deleteColor(s.id)}>
											<IClose
												iwidth='14'
												iheight='14'
											/>
										</span>
									</span>
								))
						)}
					</div>
				</form>
				<form
					onSubmit={(e) =>
						UpdateForm(e, proid, pickcolor, setpickcolor, "color")
					}
					className="editcatalog-choice-input-colors-button-wrapper">
					<button
						disabled={colorload === false ? false : true}
						type="submit">
						{colorload === false ? (
							"Submit"
						) : (
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: "100%",
									height: "100%",
								}}>
                                    <Loader cwidth="12px" cheight="12px" />
                                
							</div>
						)}
					</button>
				</form>
			</div>
		</>
	);
};

export default React.memo( EditColor);
