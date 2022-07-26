import React, { useState, Children } from "react";
// import { MyContext } from "../../../contextapi/MyProvider";
import { AnimateTransitionGroup } from "../../common/AnimateTransitionGroup";
import { IClose } from "../../common/icons/Icons";
import Loader from "../../common/Loader";
import { uinqId } from "../../util/uniqid";

const EditSize = ({ setpicksize, picksize, proid, UpdateForm, sizeload }) => {
	const [asize, setasize] = useState();
	// const { products }=useContext(MyContext)
	const [getanimate, outanimate, clearoutanimate] = AnimateTransitionGroup(
		picksize,
		setpicksize,
		setasize
	);

	const addSize = (e) => {
		e.preventDefault();

		if (asize === undefined || asize === "") return;
		getanimate({
			id: uinqId(),
			size: asize,
			animationDuration: "300ms",
			animationName: "BounceIn",
			isChecked: false,
		});
	};

	const deleteSize = async (id) => {
		outanimate(id, "BounceOut", 300);
	};

	return (
		<>
			<div className="editcatalog-update-size-wrapper">
				<form>
					<div className="editcatalog-update-size-input-wrapper">
						<input
							onChange={(e) => setasize(e.target.value)}
							type="text"
							name="size"
							value={asize || ""}
							id="price"
							required
							placeholder="Enter size"
						/>
						<button onClick={addSize} type="submit">
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
					<div className="editcatalog-choice-input-sizes-wrapper1">
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
										className={`editcatalog-choice-input-sizes-container `}>
										<p>{s.size}</p>
										<span onClick={() => deleteSize(s.id)}>
											<IClose iwidth="14" iheight="14" />
										</span>
									</span>
								))
						)}
					</div>
				</form>

				<form
					onSubmit={(e) =>
						UpdateForm(e, proid, picksize, setpicksize, "size")
					}
					className="editcatalog-choice-input-sizes-button-wrapper">
					<button
						disabled={sizeload === false ? false : true}
						type="submit">
						{sizeload === false ? (
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

export default React.memo(EditSize);
