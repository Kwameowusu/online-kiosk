import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../contextapi/MyProvider";
import Loader from "../../common/Loader";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../../firebase";
import { uinqId } from "../../util/uniqid";

const Privacy = () => {
	const { privacy, setprivacy, fetchPrivacy } = useContext(MyContext);
	const [getpriv, setgetpriv] = useState("");
	const [getprivonload, setgetprivonload] = useState(false);
	useEffect(() => {
		if (privacy[0] !== undefined) {
			setgetpriv(privacy[0].content);
		}
	}, [privacy]);

	const Updategetpriv = async (e) => {
		e.preventDefault();
		try {
			setgetprivonload(true);

			const anId = uinqId();

			const formRef = doc(db, "privacy", privacy[0].privid);
			updateDoc(formRef, {
				id: anId,
				content: getpriv,
			});

			const re = privacy.map((uu) => {
				uu.id = anId;
				uu.content = getpriv;

				return uu;
			});
			console.log(re);
			setprivacy(re);

			setgetpriv(getpriv);

			setgetprivonload(false);
		} catch (error) {}
	};
	return (
		<>
			<div className="deliverycoverage-wrapper">
				<div className="deliverycoverage-header-wrapper">
					<p className="deliverycoverage-header-text">
						Add privacy and terms
					</p>
					<p
						onClick={() => {
							fetchPrivacy();
						}}
						className="reload-data">
						refetch
					</p>
				</div>
				<div className="deliverage-add-region-wrapper">
					<form onSubmit={Updategetpriv}>
						<textarea
							onChange={(e) => setgetpriv(e.target.value)}
							required
							name=""
							id=""
							cols="30"
							value={getpriv}
							rows="10"></textarea>

						<button type="submit">
							{getprivonload === false ? (
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
					<div
						style={{ border: "none" }}
						className="deliverycoverage-choice-input-sizes-wrapper1">
						<p></p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Privacy;
