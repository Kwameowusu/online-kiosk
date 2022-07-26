import { useState, useEffect, useContext } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import db from "../../../../firebase";
import { dashThemeData, kioskThemeData, Catorientdata } from "./themedata";
import { uinqId } from "../../../util/uniqid";
import { MyContext } from "../../../../contextapi/MyProvider";
import { Check } from "../../../common/icons/Icons";

const Appearance = () => {
	const {
		kiosktheme,
		setkiosktheme,
		fetchcatOrient,
		setdashtheme,
		fetchkioskTheme,
		fetchDashTheme,
		dashtheme,
		catorient,
		setcatorient,
	} = useContext(MyContext);

	const [kioskthemedata, setkioskthemedata] = useState([]);
	const [dashthemedata, setdashthemedata] = useState([]);
	useEffect(() => {
		setdashthemedata(dashThemeData);
		setkioskthemedata(kioskThemeData);
	}, []);
	// console.log(kiosktheme)
	const SelectKioskTheme = async (themename) => {
		try {
			const anId = uinqId();

			if (kiosktheme.length !== 0 && kiosktheme[0].thid) {
				const formRef = doc(db, "kiosktheme", kiosktheme[0].thid);
				updateDoc(formRef, {
					themename: themename,
				});
				fetchkioskTheme();
				const ee = kiosktheme.map((hh) => {
					hh.id = anId;
					hh.themename = themename;
					return hh;
				});
				setkiosktheme(ee);
				return;
			}
			if (kiosktheme.length === 0) {
				await addDoc(
					collection(db, "kiosktheme"),

					{
						id: anId,
						themename: themename,
					}
				);

				fetchkioskTheme();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const SelectDashTheme = async (themename) => {
		try {
			const anId = uinqId();

			if (dashtheme.length !== 0 && dashtheme[0].thid) {
				const formRef = doc(db, "dashtheme", dashtheme[0].thid);
				updateDoc(formRef, {
					themename: themename,
				});
				const ee = dashtheme.map((hh) => {
					hh.id = anId;
					hh.themename = themename;
					return hh;
				});
				setdashtheme(ee);
				return;
			}
			if (dashtheme.length === 0) {
				console.log("jejj");
				await addDoc(
					collection(db, "dashtheme"),

					{
						id: anId,
						themename: themename,
					}
				);
				fetchDashTheme();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const CatalogOrientation = async (orient) => {
		try {
			const anId = uinqId();

			if (catorient.length !== 0 && catorient[0].oriid) {
				const formRef = doc(db, "catorient", catorient[0].oriid);
				updateDoc(formRef, {
					orient: orient,
				});
				const ee = catorient.map((hh) => {
					hh.id = anId;
					hh.orient = orient;
					return hh;
				});
				setcatorient(ee);
				return;
			}
			if (catorient.length === 0) {
				await addDoc(
					collection(db, "catorient"),

					{
						id: anId,
						orient: orient,
					}
				);
				fetchcatOrient();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="deliverycoverage-wrapper">
				<div className="deliverycoverage-header-wrapper">
					<p className="deliverycoverage-header-text">
						Add privacy and terms
					</p>
					<p className="reload-data"></p>
				</div>
				<div className="deliverage-add-region-wrapper">
					<div className="appearance-wrapper">
						<div className="appearance-onlinekiosk-theme">
							<div className="appearance-dashboard-theme-header">
								<p> Choose kiosk theme</p>
							</div>
							{kioskthemedata.map((gg) => (
								<div
									key={gg.id}
									className="appearance-onlinekiosk-theme-each-theme">
									<button
										onClick={() =>
											SelectKioskTheme(gg.themename)
										}>
										{kiosktheme.length !== 0 &&
										kiosktheme[0].themename ===
											gg.themename ? (
												<Check
													iwidth='16'
													iheight='18'
												/>
										) : (
											""
										)}
									</button>
									<img src={gg.filename} alt="" />
								</div>
							))}
						</div>
						<div className="appearance-dashboard-theme">
							<div className="appearance-dashboard-theme-header">
								<p> Choose dashboard theme</p>
							</div>
							{dashthemedata.map((gg) => (
								<div
									onClick={() =>
										SelectDashTheme(gg.themename)
									}
									key={gg.id}
									className="appearance-onlinekiosk-theme-each-theme">
									<button>
										{dashtheme.length !== 0 &&
										dashtheme[0].themename ===
											gg.themename ? (
												<Check
												iwidth='16'
												iheight='18'
											/>
										) : (
											""
										)}
									</button>
									<img src={gg.filename} alt="" />
								</div>
							))}
						</div>

						<div className="appearance-dashboard-theme">
							<div className="appearance-dashboard-theme-header">
								<p> Choose catalog orientation</p>
							</div>
							{Catorientdata.map((gg) => (
								<div
									onClick={() =>
										CatalogOrientation(gg.orient)
									}
									key={gg.id}
									className="appearance-onlinekiosk-theme-each-theme">
									<button>
										{catorient.length !== 0 &&
										catorient[0].orient === gg.orient ? (
											<Check
													iwidth='16'
													iheight='18'
												/>
										) : (
											""
										)}
									</button>
									<img src={gg.filename} alt="" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Appearance;
