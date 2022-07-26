import React, { useContext, useState } from "react";
import { MyContext } from "../../../contextapi/MyProvider";
import Loader from "../../common/Loader";
import { doc, updateDoc } from "firebase/firestore";

import db from "../../../firebase";
import { uinqId } from "../../util/uniqid";

const DeliveryFees = () => {
	const { deliveryfee, setdeliveryfee, merchid, setmerchid,fetchDeliveryfees } =
		useContext(MyContext);
	const [fee, setfee] = useState("");
	const [feeonload, setfeeonload] = useState(false);

	const [merch, setmerch] = useState("");
	const [merchload, setmerchload] = useState(false);

	const Updatefee = async (e) => {
		e.preventDefault();
		try {
			setfeeonload(true);
			if (deliveryfee.length === 0) {
				return;
			}
			const anId = uinqId();

			const formRef = doc(db, "deliveryfee", deliveryfee[0].feeid);
			updateDoc(formRef, {
				id: anId,
				Amount: Number(fee),
			});

			const re = deliveryfee.map((uu) => {
				uu.id = anId;
				uu.Amount = fee;

				return uu;
			});
			setdeliveryfee(re);
			console.log(re);

			setfee("");
			setfeeonload(false);
		} catch (error) {
			console.log(error);

			setfeeonload(false);
		}
	};

	const UpdateMerch = async (e) => {
		e.preventDefault();
		try {
			console.log(merchid)
			setmerchload(true);
			if (merchid.length === 0) {
				return;
			}
			const anId = uinqId();

			const formRef = doc(db, "merchid", merchid[0].mid);
			updateDoc(formRef, {
				id: anId,
				merchid: merch,
			});

			const re = merchid.map((uu) => {
				uu.id = anId;
				uu.merchid = merch;

				return uu;
			});
			setmerchid(re);
			console.log(re);

			setmerch("");
			setmerchload(false);
		} catch (error) {
			console.log(error);
			setmerchload(false);
		}
	};
	return (
		<>
			<div className="deliverycoverage-wrapper">
				<div className="deliverycoverage-header-wrapper">
					<p className="deliverycoverage-header-text">
						Add delivery fee and Merchant ID
					</p>
					<p
						onClick={() => {
							fetchDeliveryfees();
						}}
						className="reload-data">
						refetch
					</p>
				</div>
				<div className="deliverage-add-region-wrapper">
					<form
						onSubmit={Updatefee}
						action="
                    ">
						<input
							onChange={(e) => setfee(e.target.value)}
							// required
							type="number"
							name=""
							id=""
							value={fee || ""}
							placeholder="Enter delivery fee"
						/>
						<button type="submit">
							{feeonload === false ? (
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
						{deliveryfee.map((f) => (
							<span
								style={{
									animationDuration: `${f.animationDuration}`,
									animationName: `${f.animationName}`,
								}}
								key={f.feeid}
								className="deliverycoverage-choice-input-sizes-container">
								<p> GHC {f.Amount}.00</p>
								{/* <span>
									<i className="la la-times"></i>
								</span> */}
							</span>
						))}
					</div>
				</div>

				<div className="deliverage-add-region-wrapper">
					<form
						onSubmit={UpdateMerch}
						action="
                    ">
						<input
							onChange={(e) => setmerch(e.target.value)}
							// required
							type="text"
							name=""
							id=""
							value={merch || ""}
							placeholder="Enter mearchnt ID"
						/>
						<button type="submit">
							{merchload === false ? (
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
						{merchid.map((f) => (
							<span
								key={f.mid}
								style={{
									animationDuration: `${f.animationDuration}`,
									animationName: `${f.animationName}`,
								}}
								className="deliverycoverage-choice-input-sizes-container">
								<p> {f.merchid}</p>
							
							</span>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default DeliveryFees;
