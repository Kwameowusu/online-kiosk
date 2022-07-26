import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MyContext } from "../../../../contextapi/MyProvider";
import {
	collection,
	addDoc,
	doc,
	deleteDoc,
	query,
	where,
	getDocs,
} from "firebase/firestore";
import db from "../../../../firebase";
import { uinqId } from "../../../util/uniqid";
import Loader from "../../../common/Loader";
import { IClose } from "../../../common/icons/Icons";

const DeliverCoverage = () => {
	let active = {
		backgroundColor: "var(--ActiveUnderline)",
		color: "var(--WhiteTextColor)",
		border: "2px solid var(--ActiveUnderline)",
	};
	const { delverage, setdelverage, fetchDeliverage } = useContext(MyContext);
	const [reg, setreg] = useState();
	const [regonload, setregonload] = useState(false);

	const AddRegion = async (e) => {
		e.preventDefault();

		try {
			setregonload(true);
			const anId = uinqId();
			await addDoc(collection(db, "deliverycoverage"), {
				id: anId,
				regname: reg,
				allLocations: [],
				animationDuration: "500ms",
				animationName: "SlideInDown",
			});

			setdelverage((pp) => [
				...pp,
				{
					id: anId,
					regname: reg,
					allLocations: [],
					animationDuration: "500ms",
					animationName: "SlideInDown",
				},
			]);
			setreg("");
			setregonload(false);
		} catch (error) {}
	};

	const deleteRegion = async (id, delid) => {
		const regRef = collection(db, "deliverycoverage");
		const q = query(regRef, where("id", "==", id));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((docs) => {
			console.log();
			deleteDoc(doc(db, "deliverycoverage", `${docs.ref.id}`));
		});

		const hh = delverage.map((h) => {
			if (h.id === id) {
				h.animationName = "SlideOutDown";
			}
			return h;
		});
		console.log(hh);
		setdelverage(hh);

		setTimeout(() => {
			const tt = delverage.filter((bb) => bb.id !== id);
			setdelverage(tt);
		}, 440);
	};
	// console.log(delverage);
	return (
		<>
			<div className="deliverycoverage-wrapper">
				<div className="deliverycoverage-header-wrapper">
					<p className="deliverycoverage-header-text">
						Add place of delivery
					</p>
					<p
						onClick={() => {
							fetchDeliverage();
						}}
						className="reload-data">
						refetch
					</p>
				</div>
				<div className="deliverage-add-region-wrapper">
					<form
						onSubmit={AddRegion}
						action="
                    ">
						<input
							onChange={(e) => setreg(e.target.value)}
							value={reg || ""}
							type="text"
							placeholder="Enter a region"
							required
							name=""
							id=""
						/>

						<button type="submit">
							{regonload === false ? (
								<p>Submit</p>
							) : (
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										width: "100%",
										height: "100%",
										overflow: "hidden",
									}}>
									<Loader cwidth="12px" cheight="12px" />
								</div>
							)}
						</button>
					</form>
				</div>
				<div className="deliverycoverage-choice-input-sizes-wrapper">
					<div className="deliverycoverage-choice-input-sizes-wrapper1">
						{delverage.map((b) => (
							<NavLink
								key={b.id}
								to={`${b.id}`}
								style={({ isActive }) =>
									isActive
										? {
												...active,
												...{
													animationDuration: `${b.animationDuration}`,
													animationName: `${b.animationName}`,
												},
										  }
										: {
												...{
													animationDuration: `${b.animationDuration}`,
													animationName: `${b.animationName}`,
												},
										  }
								}
								className="deliverycoverage-choice-input-sizes-container">
								<p>{b.regname}</p>
								<span
									onClick={() => deleteRegion(b.id, b.delid)}>
									<IClose
										iwidth='14'
										iheight='14'
									/>
								</span>
							</NavLink>
						))}
					</div>
				</div>

				<Outlet />
			</div>
		</>
	);
};

export default DeliverCoverage;

