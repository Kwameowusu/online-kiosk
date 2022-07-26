import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
// import { regions } from "./RegData";
import { MyContext } from "../../../../contextapi/MyProvider";
import { uinqId } from "../../../util/uniqid";
import db from "../../../../firebase";
import {
	doc,
	updateDoc,
	collection,
	query,
	where,
	getDocs,
} from "firebase/firestore";
import Loader from "../../../common/Loader";
import { Trash } from "../../../common/icons/Icons";

const EachLocation = () => {
	let params = useParams();
	const { delverage, setdelverage } = useContext(MyContext);
	const [allloc, setallloc] = useState();
	const [regloc, setregloc] = useState(false);

	let alocation = delverage.find((b) => b.id === params.id);
	const AddLocation = async (e, id) => {
		e.preventDefault();
		try {
			setregloc(true);
			let hh = delverage.find((b) => b.id === id);
			console.log(hh);

			const regRef = collection(db, "deliverycoverage");
			const q = query(regRef, where("id", "==", id));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((docs) => {
				const formRef = doc(db, "deliverycoverage", docs.ref.id);
				updateDoc(formRef, {
					allLocations: [
						...hh.allLocations,
						{
							id: uinqId(),
							loc: allloc,
							animationDuration: "300ms",
							animationName: "BounceIn",
						},
					],
				});
			});

			const jj = delverage.map((e) => {
				if (e.id === id) {
					e.allLocations = [
						...e.allLocations,
						{
							id: uinqId(),
							loc: allloc,
							animationDuration: "300ms",
							animationName: "BounceIn",
						},
					];
				}
				return e;
			});
			setdelverage(jj);
			setallloc("");
			setregloc(false);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteLocation = async (id) => {
		let hh = delverage.find((b) => b.id === params.id);

		const yy = hh.allLocations.filter((rr) => rr.id !== id);

		const regRef = collection(db, "deliverycoverage");
		const q = query(regRef, where("id", "==", params.id));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((docs) => {
			console.log();
			const formRef = doc(db, "deliverycoverage", docs.ref.id);
			updateDoc(formRef, {
				allLocations: yy,
			});
		});

		const gg = delverage.map((e) => {
			if (e.id === params.id) {
				const bn = e.allLocations.filter((rr) => rr.id !== id);
				console.log(bn);
				e.allLocations = bn;
			}
			return e;
		});
		console.log(gg);
		setdelverage(gg);
	};

	return (
		<>
			<div className="deliverage-add-region-wrapper">
				<form onSubmit={(e) => AddLocation(e, params.id)}>
					<input
						onChange={(e) => setallloc(e.target.value)}
						value={allloc || ""}
						type="text"
						required
						placeholder="Enter a location"
						name=""
						id=""
					/>

					<button type="submit">
						{regloc === false ? (
							<p>Add</p>
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
			<div className="deliverycoverage-location-wrapper">
				{alocation
					? // React.Children.toArray()

					  alocation.allLocations.map((b) => (
							<div
								key={b.id}
								style={{
									animationDuration: `${b.animationDuration}`,
									animationName: `${b.animationName}`,
								}}
								className="deliverycoverage-each-location-wrapper">
								<p>{b.loc}</p>
								<span onClick={() => deleteLocation(b.id)}>
								  <Trash
								  
								 iwidth="20" iheight='20'
								  /
								  
								  >
								</span>
							</div>
					  ))
					: ""}
			</div>
		</>
	);
};

export default EachLocation;
