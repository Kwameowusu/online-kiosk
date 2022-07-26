import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../contextapi/MyProvider";
import Loader from "../../common/Loader";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../../firebase";
import { uinqId } from "../../util/uniqid";

const About = () => {
	const {
		about,
		setabout,
		setkioskname,
		kioskname,
		fetchAbout,
		kioskvericode,
		setkioskvericode,
	} = useContext(MyContext);
	const [getabout, setgetabout] = useState("");
	const [getname, setgetname] = useState("");
	const [getgoogle, setgetgoogle] = useState("");
	const [getface, setgetface] = useState("");

	const [getaboutonload, setgetaboutonload] = useState(false);
	const [getnameonload, setgetnameonload] = useState(false);
	const [getverionload, setgetverionload] = useState(false);

	useEffect(() => {
		if (about[0] !== undefined) {
			setgetabout(about[0].content);
		}
	}, [setgetabout, about]);

	useEffect(() => {
		if (kioskname[0] !== undefined) {
			setgetname(kioskname[0].name);
		}
	}, [setgetname, kioskname]);

	useEffect(() => {
		if (kioskvericode[0] !== undefined) {
			setgetgoogle(kioskvericode[0].google)
			setgetface(kioskvericode[0].facebook)

		}
	}, [setgetgoogle,setgetface, kioskvericode]);

	const Updategetabout = async (e) => {
		e.preventDefault();
		try {
			setgetaboutonload(true);

			const anId = uinqId();

			const formRef = doc(db, "about", about[0].aboutid);
			updateDoc(formRef, {
				id: anId,
				content: getabout,
			});

			const re = about.map((uu) => {
				uu.id = anId;
				uu.content = getabout;

				return uu;
			});
			setabout(re);

			setgetaboutonload(false);
		} catch (error) {}
	};

	const UpdateGetKioskName = async (e) => {
		e.preventDefault();
		try {
			setgetnameonload(true);

			const anId = uinqId();

			const formRef = doc(db, "kioskname", kioskname[0].kioskid);
			updateDoc(formRef, {
				id: anId,
				name: getname,
			});

			const re = kioskname.map((uu) => {
				uu.id = anId;
				uu.name = getname;

				return uu;
			});
			// console.log(re);
			setkioskname(re);

			setgetname(getname);

			setgetnameonload(false);
		} catch (error) {}
	};
	const UpdateGetKioskVeriCode = async (e) => {
		e.preventDefault();
		try {
			setgetverionload(true);

			const anId = uinqId();

			const formRef = doc(db, "kioskvericode", kioskvericode[0].verid);
			updateDoc(formRef, {
				id: anId,
				google: getgoogle,
				facebook: getface,
			});

			const re = kioskvericode.map((uu) => {
				uu.id = anId;
				uu.google = getgoogle;
				uu.facebook= getface

				return uu;
			});
			// console.log(re);
			setkioskvericode(re);

			setgetgoogle(getgoogle);
			setgetface(getface)

			setgetverionload(false);
		} catch (error) {}
	};
	// console.log(kioskname);
	return (
		<>
			<div className="deliverycoverage-wrapper">
				<div className="deliverycoverage-header-wrapper">
					<p className="deliverycoverage-header-text">
						Add about kiosk
					</p>
					<p
						onClick={() => {
							fetchAbout();
						}}
						className="reload-data">
						refetch
					</p>
				</div>
				<div className="deliverage-add-region-wrapper">
					<form
						action="
					"
						onSubmit={UpdateGetKioskName}>
						<label htmlFor="">Kiosk name</label>
						
						<input
							onChange={(e) => setgetname(e.target.value)}
							// required
							type="text"
							name=""
							id=""
							value={getname || ""}
						/>
						<button type="submit">
							{getnameonload === false ? (
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
					<form
						action="
					"
						onSubmit={UpdateGetKioskVeriCode}>
						<label htmlFor="">Google verifiaction code</label>
						<input
							onChange={(e) => setgetgoogle(e.target.value)}
							// required
							type="text"
							name=""
							id=""
							placeholder="google-verification-code"
							value={getgoogle || ""}
						/>
						<label style={{ paddingTop: "15px" }} htmlFor="">
							Facebook verifiaction code
						</label>

						<input
							onChange={(e) => setgetface(e.target.value)}
							// required
							type="text"
							name=""
							id=""
							placeholder="facebook-verification-code"
							value={getface || ""}
						/>
						<button type="submit">
							{getverionload === false ? (
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
					<form onSubmit={Updategetabout}>

					<label htmlFor="">About</label>

						<textarea
							onChange={(e) => setgetabout(e.target.value)}
							required
							name=""
							id=""
							cols="30"
							value={getabout}
							rows="10"></textarea>

						<button type="submit">
							{getaboutonload === false ? (
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

export default About;
