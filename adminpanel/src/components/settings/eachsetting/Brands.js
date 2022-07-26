import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../../contextapi/MyProvider";
// import {
// 	collection,
// 	addDoc,
// 	doc,
// 	deleteDoc,
// 	query,
// 	where,
// 	getDocs,
// } from "firebase/firestore";
// import db from "../../../firebase";
// import { uinqId } from "../../util/uniqid";
import Loader from "../../common/Loader";
import { brandsCatAdd, brandsCatDelete } from "../../util/brands-delete-add";
import { IClose } from "../../common/icons/Icons";
import { socialLinks } from "../../util/social-links";

const Brands = () => {
	const {
		sociallinks,
		setsociallinks,
		brands,
		setbrands,
		fetchBrands,
		category,
		setcategory,
		fetchCategory,
	} = useContext(MyContext);
	const [getbrand, setgetbrand] = useState();
	const [getbrandonload, setgetbrandonload] = useState(false);
	const [getcategory, setgetcategory] = useState();
	const [getcategoryload, setgetcategoryload] = useState(false);

	const [getfacelink, setgetfacelink] = useState();
	const [getfacelinkload, setgetfacelinkload] = useState(false);
	useEffect(() => {
		if (sociallinks[0] !== undefined) {
			setgetfacelink(sociallinks[0].facebook);
		}
	}, [setgetfacelink, sociallinks]);

	const [gettwitterlink, setgettwitterlink] = useState();
	const [gettwitterlinkload, setgettwitterlinkload] = useState(false);

	useEffect(() => {
		if (sociallinks[0] !== undefined) {
			setgettwitterlink(sociallinks[0].twitter);
		}
	}, [setgettwitterlink, sociallinks]);

	const [getinstagramlink, setgetinstagramlink] = useState();
	const [getinstagramlinkload, setgetinstagramlinkload] = useState(false);

	useEffect(() => {
		if (sociallinks[0] !== undefined) {
			setgetinstagramlink(sociallinks[0].twitter);
		}
	}, [setgetinstagramlink, sociallinks]);

	const [getwhatslink, setgetwhatslink] = useState();
	const [getwhatslinkload, setgetwhatslinkload] = useState(false);

	useEffect(() => {
		if (sociallinks[0] !== undefined) {
			setgetwhatslink(sociallinks[0].twitter);
		}
	}, [setgetwhatslink, sociallinks]);
	return (
		<>
			<div className="deliverycoverage-wrapper">
				<div className="deliverycoverage-header-wrapper">
					<p className="deliverycoverage-header-text">
						Add product brand
					</p>
					<p
						onClick={() => {
							fetchBrands();
							fetchCategory();
						}}
						className="reload-data">
						refetch
					</p>
				</div>
				<div className="deliverage-add-region-wrapper">
					<form
						onSubmit={(e) => {
							brandsCatAdd(
								e,
								"brands",
								setgetbrandonload,
								getbrand,
								setgetbrand,
								setbrands
							);
						}}
						action="
                    ">
						<input
							onChange={(e) => setgetbrand(e.target.value)}
							value={getbrand || ""}
							type="text"
							placeholder="Enter  brand name"
							required
							name=""
							id=""
						/>
						<button type="submit">
							{getbrandonload === false ? (
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
						{brands.map((b) => (
							<span
								key={b.id}
								style={{
									animationDuration: `${b.animationDuration}`,
									animationName: `${b.animationName}`,
								}}
								className="deliverycoverage-choice-input-sizes-container">
								<p>{b.name}</p>
								<span
									onClick={() =>
										brandsCatDelete(
											"brands",
											b.id,
											brands,
											setbrands
										)
									}>
									<IClose iwidth="14" iheight="14" />
								</span>
							</span>
						))}
					</div>
				</div>
				<div className="deliverage-add-region-wrapper">
					<form
						onSubmit={(e) => {
							brandsCatAdd(
								e,
								"category",
								setgetcategoryload,
								getcategory,
								setgetcategory,
								setcategory
							);
						}}
						action="
                    ">
						<input
							onChange={(e) => setgetcategory(e.target.value)}
							value={getcategory || ""}
							type="text"
							placeholder="Enter products categories"
							required
							name=""
							id=""
						/>
						<button type="submit">
							{getcategoryload === false ? (
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
						{category.map((b) => (
							<span
								key={b.id}
								style={{
									animationDuration: `${b.animationDuration}`,
									animationName: `${b.animationName}`,
								}}
								className="deliverycoverage-choice-input-sizes-container">
								<p>{b.name}</p>
								<span
									onClick={() =>
										brandsCatDelete(
											"category",
											b.id,
											category,
											setcategory
										)
									}>
									<IClose iwidth="14" iheight="14" />
								</span>
							</span>
						))}
					</div>
				</div>
				<div className="deliverage-add-region-wrapper">
					<form
						action="
					"
						onSubmit={(e) => {
							socialLinks(
								e,
								setgetfacelinkload,
								sociallinks,
								setsociallinks,
								getfacelink,
								setgetfacelink,
								"facebook"
							);
						}}>
						<label htmlFor="">Facebook Link</label>

						<input
							onChange={(e) => setgetfacelink(e.target.value)}
							// required
							type="text"
							name=""
							id=""
							value={getfacelink || ""}
							placeholder="facebook"
						/>
						<button type="submit">
							{getfacelinkload === false ? (
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
						onSubmit={(e) => {
							socialLinks(
								e,
								setgettwitterlinkload,
								sociallinks,
								setsociallinks,
								gettwitterlink,
								setgettwitterlink,
								"twitter"
							);
						}}>
						<label htmlFor="">Twitter Link</label>

						<input
							onChange={(e) => setgettwitterlink(e.target.value)}
							// required
							type="text"
							name=""
							id=""
							value={gettwitterlink || ""}
							placeholder="twitter"
						/>
						<button type="submit">
							{gettwitterlinkload === false ? (
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
						onSubmit={(e) => {
							socialLinks(
								e,
								setgetinstagramlinkload,
								sociallinks,
								setsociallinks,
								getinstagramlink,
								setgetinstagramlink,
								"instagram"
							);
						}}>
						<label htmlFor="">Instagram Link</label>

						<input
							onChange={(e) =>
								setgetinstagramlink(e.target.value)
							}
							// required
							type="text"
							name=""
							id=""
							value={getinstagramlink || ""}
							placeholder="instagram"
						/>
						<button type="submit">
							{getinstagramlinkload === false ? (
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
						onSubmit={(e) => {
							socialLinks(
								e,
								setgetwhatslinkload,
								sociallinks,
								setsociallinks,
								getwhatslink,
								setgetwhatslink,
								"whatsapp"
							);
						}}>
						<label htmlFor="">WhatsApp Link</label>

						<input
							onChange={(e) => setgetwhatslink(e.target.value)}
							// required
							type="text"
							name=""
							id=""
							value={getwhatslink || ""}
							placeholder="whatsapp"
						/>
						<button type="submit">
							{getwhatslinkload === false ? (
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
			</div>
		</>
	);
};

export default Brands;
