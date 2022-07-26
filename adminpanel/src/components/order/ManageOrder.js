import React, { useContext, useState,useEffect } from "react";
import Search from "../common/Search";
import DeleteCatalog from "../overlay.js/DeleteCatalog";
import ExpandOrder from "../overlay.js/ExpandOrder";

import { getDatabase, ref, update } from "firebase/database";

import Loader from "../common/Loader";
import { MyOrderContext } from "../../contextapi/OrderProvider";
import { MyContext } from "../../contextapi/MyProvider";
import {
	AngleDown,
	AngleUp,
	Check,
	Expand,
	ISearch,
	Trash,
} from "../common/icons/Icons";

const ManageOrder = () => {
	const [dsearch, setdsearch] = useState(false);
	const [deleteclose, setdeleteclose] = useState(null);
	const [hideheader, sethideheader] = useState(false);
	const [showdetails, setshowdetails] = useState(null);
	const [deleteinfo, setdeleteinfo] = useState({});
	const [editinfo, seteditinfo] = useState({});
	// console.log(setDate(1650063785787))

	const { orders, setorders, nextbatchorder } = useContext(MyOrderContext);
	const { search } = useContext(MyContext);
	const PopDelete = (deleteid, productsImages, probanner) => {
		setdeleteinfo({
			deleteid,
			productsImages,
			probanner,
		});
	};
	// console.log(nextbatchorder)
	const PopEdit = (or, id) => {
		seteditinfo(or);
		const db = getDatabase();

		orders.forEach(async (or) => {
			if (or.oid === id && or.isRead === 0) {
				await update(ref(db, "orderdetails/" + id), {
					isRead: 1,
				});
				return;
			}
		});

		const uu = orders.map((or) => {
			if (or.oid === id && or.isRead === 0) {
				or.isRead = 1;
				return or;
			}
			return or;
		});
		// console.log(uu);
		setorders(uu);
	};

	const CheckDelivered = async (id) => {
		// console.log(orders[0].createdAt);

		try {
			const db = getDatabase();

			orders.forEach(async (or) => {
				if (or.oid === id && or.isChecked === 1) {
					await update(ref(db, "orderdetails/" + id), {
						isChecked: 0,
					});
					return;
				} else if (or.oid === id && or.isChecked === 0) {
					await update(ref(db, "orderdetails/" + id), {
						isChecked: 1,
					});
					// await updateDoc(formRef, {
					// 	isChecked: 1,
					// });
				}
			});

			const uu = orders.map((or) => {
				if (or.oid === id && or.isChecked === 1) {
					or.isChecked = 0;
					return or;
				} else if (or.oid === id && or.isChecked === 0) {
					or.isChecked = 1;
					return or;
				}
				return or;
			});
			// console.log(uu);
			setorders(uu);
		} catch (error) {}
	};

    	useEffect(() => {
			if (showdetails === true) {
				document.querySelector("body").style.overflow = "hidden";
			}
			if (showdetails === null || showdetails === false)
				document.querySelector("body").style.overflow = "initial";
		}, [showdetails]);

	return (
		<>
			<DeleteCatalog
				deleteclose={deleteclose}
				setdeleteclose={setdeleteclose}
				deleteinfo={deleteinfo}
				collection="allorders"
				folder=""
			/>

			<ExpandOrder
				setshowdetails={setshowdetails}
				showdetails={showdetails}
				orderinfo={editinfo}
			/>

			<div className="manageoder-wrapper">
				<div className="className-container-outer">
					{dsearch ? (
						<Search top="0px" setdsearch={setdsearch} />
					) : (
						""
					)}

					<div className="manageorder-container">
						<div className="manageorder-header-container">
							<div className="manageorder-header-container-inner">
								<p className=" manageorder-header-head">
									All Orders
								</p>
								<span className="manageorder-header-total">
									<p className="p1">
										Total :{" "}
										{
											[
												...new Map(
													orders.map((item) => [
														item.code,
														item,
													])
												).values(),
											].length
										}
									</p>
								</span>

								<span className="manageorder-header-delete-button-wrapper">
									<button>
										<p>Delete all</p>
										<Trash iwidth="16" height="16" />
									</button>
								</span>
								<span className="manageorder-header-button-wrapper">
									<button onClick={() => setdsearch(true)}>
										<p>Search</p>
										<ISearch iwidth="16" iheight="16" />
									</button>
								</span>
								<span className="manageorder-header-button-dropdown-wrapper">
									<button
										onClick={() =>
											sethideheader(!hideheader)
										}>
										{hideheader ? (
											<AngleUp iwidth="16" iheight="16" />
										) : (
											<AngleDown
												iwidth="16"
												iheight="16"
											/>
										)}
									</button>
								</span>
							</div>
							{hideheader ? (
								<div className="manageorder-header-container-inner-hide">
									<span className="manageorder-header-delete-button-wrapper-hide">
										<button>
											<p>Delete all</p>
											<Trash iwidth="14" iheight="14"/>
										</button>
									</span>
									<span className="manageorder-header-button-wrapper-hide">
										<button
											onClick={() => setdsearch(true)}>
											<p>Search</p>
											<ISearch iwidth="16" iheight="16" />
										</button>
									</span>
								</div>
							) : (
								""
							)}
						</div>

						<div className="manageorder-all-order-wrapper">
							{orders
								? [
										...new Map(
											orders.map((item) => [
												item.code,
												item,
											])
										).values(),
								  ]
										.filter((post) => {
											if (
												search === "" ||
												search === undefined
											)
												return post;
											else if (
												post.name
													.toString()
													.toLowerCase()
													.includes(
														search
															.toString()
															.toLowerCase()
													) ||
												post.code
													.toString()
													.toLowerCase()
													.includes(
														search
															.toString()
															.toLowerCase()
													) ||
												post.phone
													.toString()
													.toLowerCase()
													.includes(
														search
															.toString()
															.toLowerCase()
													)
											)
												return post;
											return "";
										})
										.map((or) => (
											<div
												style={{
													borderLeft:
														or.isRead === 0 &&
														"2px solid green",
												}}
												key={or.oid}
												className="manageorder-each-oder-wrapper">
												<span className="manageorder-each-check-button-wrapper">
													<button
														onClick={() =>
															CheckDelivered(
																or.oid
															)
														}
														className="manageorder-each-check-button">
														{or.isChecked === 1 ? (
															<Check
																iwidth="16"
																iheight="16"
															/>
														) : (
															""
														)}
													</button>
												</span>
												<span className="manageorder-previewcode-wrapper">
													<p
														style={{
															textDecoration:
																or.isChecked ===
																1
																	? "line-through"
																	: "",
															color:
																or.isRead ===
																	0 &&
																"green",
														}}>
														{or.code}
													</p>
												</span>
												<span className="manageorder-previewdate-wrapper">
													<div className="manageorder-date-wrapper">
														<p
															style={{
																color:
																	or.isRead ===
																		0 &&
																	"green",
															}}>
															{new Date(
																or.createdAt
															).toLocaleDateString(
																"en-gb",
																{
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																}
															) +
																" " +
																Intl.DateTimeFormat(
																	"en",
																	{
																		hour: "numeric",
																		minute: "numeric",
																		hour12: true,
																	}
																).format(
																	or.createdAt
																)}

															{}
														</p>
													</div>
												</span>

												<div className="managerorder-each-trash-edit-wrapper">
													<span className="manageorder-each-trash-wrapper">
														<span
															className="p1"
															onClick={() => {
																setshowdetails(
																	true
																);
																PopEdit(
																	or,
																	or.oid
																);
															}}>
															<Expand
															
																iwidth='20'
																iheight='20'
															/>
														</span>
													</span>
													<span className="manageorder-each-trash-wrapper">
														<span
															className="p2"
															
															onClick={() => {
																setdeleteclose(
																	true
																);

																PopDelete(
																	or.oid,
																	"",
																	""
																);
															}}>
															<Trash
																iwidth="20"
																iheight="20"
															/>
														</span>
													</span>
												</div>
											</div>
										))
								: ""}
						</div>
					</div>
					{nextbatchorder === true ? (
						<div
							style={{
								marginTop: "20px",
								width: "100%",
								height: "30px",
								display: "flex",
								// alignItems: "center",
								justifyContent: "center",
							}}>
							<Loader cwidth={"10px"} cheight={"10px"} />
						</div>
					) : (
						<div
							style={{
								display: "flex",
								alignItems: "center",
								width: "100%",
								justifyContent: "center",
							}}>
							<div
								style={{
									marginTop: "20px",
									width: "95%",
									height: "30px",
									display: "flex",
									fontWeight: "bolder",
									justifyContent: "center",

									borderTop: "1px solid var(--BorderColor)",
								}}>
								<div
									style={{
										backgroundColor: "var(--BorderColor)",
										width: "7px",
										height: "7px",
										borderRadius: "50%",
										marginTop: "10px",
									}}></div>
							</div>
						</div>
					)}
					{/* <div ref={loaderOrder} className="catalog-bottom"></div> */}
				</div>
			</div>
		</>
	);
};

export default ManageOrder;
