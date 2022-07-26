import React, {
	useRef,
	Children,
	useEffect,
	useContext,
	useState,
} from "react";
import AnimateTransition from "../common/AnimateTransition";
import { ErrorPlate, SuccessPlate } from "../common/ErrorPlate";
import Loader from "../common/Loader";
import EditColor from "../products/displayproduct/EditColor";
import db from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import EditSize from "../products/displayproduct/EditSize";
import { EachDataOnChange } from "../util/EachDataOnChange";
import { UpdateFormWrapper } from "../util/UpdateForm";
import { MyContext } from "../../contextapi/MyProvider";
import { EachOnChange } from "../util/Onchange";
import { UpdateImageWrapper } from "../util/UpdateImage";
import { Check, IClose } from "../common/icons/Icons";

const EditCatalog = ({ seteditclose, editclose, editinfo,seteditinfo }) => {
	// console.log(editinfo);

	const { products, setproducts, category } = useContext(MyContext);
	const nodeRef = useRef();
	const [
		imageDimensionPrompt,
		allCompressedImages,
		setallCompressedImages,
		OnChange,
		anupload,
		compressedFile,
		filecolor,
	] = EachOnChange();
	const [
		nofile,
		uploadSuccess,
		UpdateImage,
		uploadError,
		ImgeUrl,
		setImgUrl,
		uploadNumber,
	] = UpdateImageWrapper();
	const [
		UpdateForm,
		nameload,
		priceload,
		discountload,
		stockload,
		stnumload,
		catload,
		descripload,
		namesucc,
		pricesucc,
		discountsucc,
		stocksucc,
		stnumsucc,
		catsucc,
		descripsucc,
		colorsucc,
		colorload,
		sizeload,
		sizesucc,
		file1load,
		file1succ,
		file2load,
		file2succ,
		file3load,
		file3succ,
		file4load,
		file4succ,
	] = UpdateFormWrapper(compressedFile, ImgeUrl, filecolor, setImgUrl);
	const [
		dataOnChange,
		name,
		price,
		discount,
		stock,
		stocknumber,
		description,
		pickcolor,
		picksize,
		setdiscount,
		setname,
		setprice,
		setstock,
		setstocknumber,
		setdescription,
		setpickcolor,
		setpicksize,
	] = EachDataOnChange();

	useEffect(() => {
		if (editinfo !== undefined) {
			setname(editinfo.name);
			setprice(editinfo.price);
			setstocknumber(editinfo.stockNumber);
			setdescription(editinfo.description);
			setdiscount(editinfo.discount);
		}
	}, [
		editinfo,
		setdescription,
		setname,
		setprice,
		setstocknumber,
		setdiscount,
	]);

	const deleteSize = async (id) => {
		const formRef = doc(db, "myproducts", editinfo.id);

		const pp = editinfo.picksize.filter((p) => p.id !== id);
		// console.log(pp);

		await updateDoc(formRef, {
			picksize: [...pp],
		});
		const ee = products.map((oo) => {
			if (oo.id === editinfo.id) {
				// console.log(oo.picksize)
				oo.picksize = [...pp];
			}
			return oo;
		});
		// console.log(ee);
		setproducts(ee);
	};
	const deleteColor = async (id) => {
		const formRef = doc(db, "myproducts", editinfo.id);

		const pp = editinfo.pickcolor.filter((p) => p.id !== id);
		// console.log(pp);

		await updateDoc(formRef, {
			pickcolor: [...pp],
		});

		const ee = products.map((oo) => {
			if (oo.id === editinfo.id) {
				// console.log(oo);
				oo.pickcolor = [...pp];
			}
			return oo;
		});
		// console.log(ee);
		setproducts(ee);
	};
	const [selectcat, setselectcat] = useState([]);

	const SelectCategory = (cat) => {
		if (category.some((e) => e.id === selectcat.id)) {
			setselectcat([]);

			return;
		}
		setselectcat([cat]);
	};
	useEffect(() => {
		if (editinfo) {
			setselectcat([editinfo.category]);
			// console.log(editinfo.category);
		}
	}, [editinfo]);
	return (
		<>
			<AnimateTransition
				promptWrapeprClassName="yes"
				timeOut={300}
				EnterAnimate="ZoomIn"
				ExitAnimate="ZoomOut"
				detailsError={editclose}
				nodeRef={nodeRef}>
				<div ref={nodeRef} className="expandorder-wrapper">
					<div className="expandorder-container">
						<div className="editcatalog-close-wrapper">
							<p>Update a product</p>
							<span
								onClick={() => {
									seteditinfo();
									seteditclose(false);
								}}
								className="editcatalog-close">
								<IClose iwidth="18" iheight="18" />
							</span>
						</div>
						<div className="editcatalog-upload-update-wrapper">
							<div className="editcatalog-the-details-form-wrapper">
								<form
									onSubmit={(e) =>
										UpdateImage(
											e,
											allCompressedImages,
											setallCompressedImages,
											editinfo.productsImages.image1
												.filename,
											1
										)
									}
									className="editcatalog-the-details-image-form">
									<div className="editcatalog-upade-image">
										<input
											onChange={(e) => OnChange(e, 1)}
											type="file"
											name="file"
											required
											id="image"
											alt=""
										/>
										<div className="editcatalog-upade-image-loader">
											{Number(anupload) === 1 ? (
												<span
													style={{
														width: "100%",
														height: "25px",
														display: "flex",
														alignItems: "center",
														justifyContent:
															"center",
														opacity: "0.8",
													}}>
													<Loader
														cwidth="14px"
														cheight="14px"
													/>
												</span>
											) : (
												<label htmlFor="file">
													Update product image one
												</label>
											)}
										</div>
									</div>
									<button type="submit">
										{Number(uploadNumber) === 1 ? (
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													width: "100%",
													height: "100%",
												}}>
												<Loader
													cwidth="10px"
													cheight="10px"
												/>
											</div>
										) : (
											"Upload"
										)}
									</button>
								</form>
								<form
									onSubmit={(e) =>
										UpdateForm(
											e,
											editinfo.id,
											"NaN",
											"",
											"file1"
										)
									}
									className="editcatalog-the-details-image-form2">
									<button
										disabled={
											file1load === false ? false : true
										}
										type="submit">
										{file1load === false ? (
											"Upload data to database"
										) : (
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													width: "100%",
													height: "100%",
												}}>
												<Loader
													cwidth="10px"
													cheight="10px"
												/>
											</div>
										)}
									</button>
									{editinfo !== undefined ? (
										<div className="haa">
											<span
												style={{
													backgroundColor: `${editinfo.productsImages.image1.color}`,
												}}>
												<img
													src={
														editinfo.productsImages
															.image1.url
													}
													onError={(e) =>
														(e.target.style.display =
															"none")
													}
													alt=""
												/>
											</span>
										</div>
									) : (
										<div className="haa"></div>
									)}
								</form>
							</div>

							<div className="editcatalog-the-details-form-wrapper">
								<form
									onSubmit={(e) =>
										UpdateImage(
											e,
											allCompressedImages,
											setallCompressedImages,
											editinfo.productsImages.image2
												.filename,
											2
										)
									}
									className="editcatalog-the-details-image-form">
									<div className="editcatalog-upade-image">
										<input
											onChange={(e) => OnChange(e, 2)}
											type="file"
											name="file"
											required
											id="image"
											alt=""
										/>

										<div className="editcatalog-upade-image-loader">
											{Number(anupload) === 2 ? (
												<span
													style={{
														width: "100%",
														height: "25px",
														display: "flex",
														alignItems: "center",
														justifyContent:
															"center",
														opacity: "0.8",
													}}>
													<Loader
														cwidth="14px"
														cheight="14px"
													/>
												</span>
											) : (
												<label htmlFor="file">
													Update product image two
												</label>
											)}
										</div>
									</div>
									<button type="submit">
										{Number(uploadNumber) === 2 ? (
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													width: "100%",
													height: "100%",
												}}>
												<Loader
													cwidth="10px"
													cheight="10px"
												/>
											</div>
										) : (
											"Upload"
										)}
									</button>
								</form>
								<form
									onSubmit={(e) =>
										UpdateForm(
											e,
											editinfo.id,
											"NaN",
											"",
											"file2"
										)
									}
									className="editcatalog-the-details-image-form2">
									<button
										disabled={
											file2load === false ? false : true
										}
										type="submit">
										{file2load === false ? (
											"Upload data to database"
										) : (
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													width: "100%",
													height: "100%",
												}}>
												<Loader
													cwidth="10px"
													cheight="10px"
												/>
											</div>
										)}
									</button>

									{editinfo !== undefined ? (
										<div className="haa">
											<span
												style={{
													backgroundColor: `${editinfo.productsImages.image2.color}`,
												}}>
												<img
													src={
														editinfo.productsImages
															.image2.url
													}
													onError={(e) =>
														(e.target.style.display =
															"none")
													}
													alt=""
												/>
											</span>
										</div>
									) : (
										<div className="haa"></div>
									)}
								</form>
							</div>
							<div className="editcatalog-the-details-form-wrapper">
								<form
									onSubmit={(e) =>
										UpdateImage(
											e,
											allCompressedImages,
											setallCompressedImages,
											editinfo
												.AnimateTransitionproductsImages
												.image3.filename,
											3
										)
									}
									className="editcatalog-the-details-image-form">
									<div className="editcatalog-upade-image">
										<input
											onChange={(e) => OnChange(e, 3)}
											type="file"
											name="file"
											required
											id="image"
											alt=""
										/>
										<div className="editcatalog-upade-image-loader">
											{Number(anupload) === 3 ? (
												<span
													style={{
														width: "100%",
														height: "25px",
														display: "flex",
														alignItems: "center",
														justifyContent:
															"center",
														opacity: "0.8",
													}}>
													<Loader
														cwidth="14px"
														cheight="14px"
													/>
												</span>
											) : (
												<label htmlFor="file">
													Update product image three
												</label>
											)}
										</div>
									</div>
									<button type="submit">
										{Number(uploadNumber) === 3 ? (
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													width: "100%",
													height: "100%",
												}}>
												<Loader
													cwidth="10px"
													cheight="10px"
												/>
											</div>
										) : (
											"Upload"
										)}
									</button>
								</form>
								<form
									onSubmit={(e) =>
										UpdateForm(
											e,
											editinfo.id,
											"NaN",
											"",
											"file3"
										)
									}
									className="editcatalog-the-details-image-form2">
									<button
										disabled={
											file3load === false ? false : true
										}
										type="submit">
										{file3load === false ? (
											"Upload data to database"
										) : (
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													width: "100%",
													height: "100%",
												}}>
												<Loader
													cwidth="10px"
													cheight="10px"
												/>
											</div>
										)}
									</button>

									{editinfo !== undefined ? (
										<div className="haa">
											<span
												style={{
													backgroundColor: `${editinfo.productsImages.image3.color}`,
												}}>
												<img
													src={
														editinfo.productsImages
															.image3.url
													}
													onError={(e) =>
														(e.target.style.display =
															"none")
													}
													alt=""
												/>
											</span>
										</div>
									) : (
										<div className="haa"></div>
									)}
								</form>
							</div>
							<div className="editcatalog-the-details-form-wrapper">
								<form
									onSubmit={(e) =>
										UpdateImage(
											e,
											allCompressedImages,
											setallCompressedImages,
											editinfo.productBanner.filename,
											4
										)
									}
									className="editcatalog-the-details-image-form">
									<div className="editcatalog-upade-image">
										<div className="editcatalog-upade-image-loader">
											{Number(anupload) === 4 ? (
												<span
													style={{
														width: "100%",
														height: "25px",
														display: "flex",
														alignItems: "center",
														justifyContent:
															"center",
														opacity: "0.8",
													}}>
													<Loader
														cwidth="14px"
														cheight="14px"
													/>
												</span>
											) : (
												<label htmlFor="file">
													Update product
													banner(min(600 x 314))
												</label>
											)}
										</div>
										<input
											onChange={(e) => OnChange(e, 4)}
											type="file"
											name="file"
											required
											id="image"
											alt=""
										/>
									</div>
									<button type="submit">
										{Number(uploadNumber) === 4 ? (
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													width: "100%",
													height: "100%",
												}}>
												<Loader
													cwidth="10px"
													cheight="10px"
												/>
											</div>
										) : (
											"Upload"
										)}
									</button>
								</form>
								<form
									onSubmit={(e) =>
										UpdateForm(
											e,
											editinfo.id,
											"NaN",
											"",
											"file4"
										)
									}
									className="editcatalog-the-details-image-form2">
									<button
										disabled={
											file4load === false ? false : true
										}
										type="submit">
										{file4load === false ? (
											"Upload data to database"
										) : (
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													width: "100%",
													height: "100%",
												}}>
												<Loader
													cwidth="10px"
													cheight="10px"
												/>
											</div>
										)}
									</button>

									{editinfo !== undefined ? (
										<div className="haa">
											<span
												style={{
													backgroundColor: `${editinfo.productBanner.color}`,
												}}>
												<img
													src={
														editinfo.productBanner
															.url
													}
													onError={(e) =>
														(e.target.style.display =
															"none")
													}
													alt=""
												/>
											</span>
										</div>
									) : (
										<div className="haa"></div>
									)}
								</form>
							</div>
							<form
								onSubmit={(e) =>
									UpdateForm(
										e,
										editinfo.id,
										name,
										setname,
										"name"
									)
								}
								className="editcatalog-input-name">
								<label htmlFor="">Name</label>
								<div className="editcatalog-update-name-button">
									{editinfo !== undefined ? (
										<input
											onChange={(e) =>
												dataOnChange(e, "name")
											}
											value={name}
											type="text"
											name="name"
											id="name"
											placeholder="Update product name"
											required
										/>
									) : (
										""
									)}
									<button
										disabled={
											priceload === false ? false : true
										}
										type="submit">
										{nameload === false ? (
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
												<Loader
													cwidth="10px"
													cheight="10px"
												/>
											</div>
										)}
									</button>
								</div>
							</form>
							<form
								onSubmit={(e) =>
									UpdateForm(
										e,
										editinfo.id,
										price,
										setprice,
										"price"
									)
								}
								className="editcatalog-input-name">
								<label htmlFor="">Price</label>
								<div className="editcatalog-update-name-button">
									{editinfo !== undefined ? (
										<input
											onChange={(e) =>
												dataOnChange(e, "price")
											}
											value={price}
											type="number"
											name="price"
											id="price"
											required
											placeholder="Product price"
										/>
									) : (
										""
									)}
									<button
										disabled={
											priceload === false ? false : true
										}
										type="submit">
										{priceload === false ? (
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
												<Loader
													cwidth="12px"
													cheight="12px"
												/>
											</div>
										)}
									</button>
								</div>
							</form>
							<form
								onSubmit={(e) =>
									UpdateForm(
										e,
										editinfo.id,
										discount,
										setdiscount,
										"discount"
									)
								}
								className="editcatalog-input-name">
								<label htmlFor="">Discount</label>
								<div className="editcatalog-update-name-button">
									{editinfo !== undefined ? (
										<input
											onChange={(e) =>
												dataOnChange(e, "discount")
											}
											value={discount}
											type="number"
											name="discount"
											id="discount"
											required
											placeholder="Update discount"
										/>
									) : (
										""
									)}
									<button
										disabled={
											discountload === false
												? false
												: true
										}
										type="submit">
										{discountload === false ? (
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
												<Loader
													cwidth="12px"
													cheight="12px"
												/>
											</div>
										)}
									</button>
								</div>
							</form>
							<form
								onSubmit={(e) =>
									UpdateForm(
										e,
										editinfo.id,
										stocknumber,
										setstocknumber,
										"stocknumber"
									)
								}
								className="editcatalog-input-name">
								<label htmlFor="">Number of stock</label>
								<div className="editcatalog-update-name-button">
									{editinfo !== undefined ? (
										<input
											onChange={(e) =>
												dataOnChange(e, "stocknumber")
											}
											value={stocknumber}
											type="number"
											name="price"
											id="price"
											required
											placeholder="Update product stock number"
										/>
									) : (
										""
									)}
									<button
										disabled={
											stnumload === false ? false : true
										}
										type="submit">
										{stnumload === false ? (
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
												<Loader
													cwidth="12px"
													cheight="12px"
												/>
											</div>
										)}
									</button>
								</div>
							</form>
							<div className="editcatalog-input-name">
								<label htmlFor="">Product Category</label>
								<div className="editcatalog-product-category-wrapper">
									{category.map((b) => (
										<span
											key={b.id}
											style={{
												animationDuration: `${b.animationDuration}`,
												animationName: `${b.animationName}`,
											}}
											className="deliverycoverage-choice-input-sizes-container">
											<p>{b.name}</p>
											<button
												type="button"
												onClick={() =>
													SelectCategory(b)
												}
												className="addproduct-category-button">
												{selectcat ? (
													selectcat.some(
														(e) => e.id === b.id
													) ? (
														<Check
															iwidth="18"
															iheight="18"
														/>
													) : (
														""
													)
												) : (
													""
												)}
											</button>
										</span>
									))}
									<span className="addproduct-size-choice-clear">
										<p onClick={() => setselectcat([])}>
											Clear
										</p>
									</span>

									<form
										onSubmit={(e) =>
											UpdateForm(
												e,
												editinfo.id,
												selectcat,
												setselectcat,
												"category"
											)
										}
										className="editcatalog-choice-input-colors-button-wrapper">
										<button
											disabled={
												catload === false ? false : true
											}
											type="submit">
											{catload === false ? (
												"Submit"
											) : (
												<div
													style={{
														display: "flex",
														alignItems: "center",
														justifyContent:
															"center",
														width: "100%",
														height: "100%",
													}}>
													<Loader
														cwidth="12px"
														cheight="12px"
													/>
												</div>
											)}
										</button>
									</form>
								</div>
							</div>
							<form
								onSubmit={(e) =>
									UpdateForm(
										e,
										editinfo.id,
										stock,
										setstock,
										"stock"
									)
								}
								className="editcatalog-input-name">
								<label htmlFor="">Stock</label>
								<div className="editcatalog-update-stock-button">
									<div className="editcatalog-update-instock">
										<input
											onChange={(e) =>
												dataOnChange(e, "stock")
											}
											type="radio"
											name="stock"
											id="In stock"
											required
										/>
										<label htmlFor="In stock">
											In stock
										</label>
									</div>

									<div className="editcatalog-update-outofstock">
										<input
											onChange={(e) =>
												dataOnChange(e, "stock")
											}
											type="radio"
											name="stock"
											id="Out of stock"
											required
										/>
										<label htmlFor="Out of stock">
											Out of stock
										</label>
									</div>

									<button
										disabled={
											stockload === false ? false : true
										}
										type="submit">
										{stockload === false ? (
											"Submit"
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
												<Loader
													cwidth="12px"
													cheight="12px"
												/>
											</div>
										)}
									</button>
								</div>
							</form>
							<div className="editcatalog-input-name">
								<span className="label" htmlFor="">
									Size
								</span>

								<div className="editcatalog-display-sizes-wrapper">
									<div className="editcatalog-choice-input-sizes-wrapper">
										{editinfo !== undefined ? (
											<>
												{Children.toArray(
													editinfo.picksize.map(
														(s) => (
															<span
																className="editcatalog-choice-input-sizes-container"
																style={{
																	animationDuration: `${s.animationDuration}`,
																	animationName: `${s.animationName}`,
																}}>
																<p>{s.size}</p>

																<span
																	onClick={() =>
																		deleteSize(
																			s.id
																		)
																	}>
																	<IClose
																		iwidth="16"
																		iheight="16"
																	/>
																</span>
															</span>
														)
													)
												)}
											</>
										) : (
											""
										)}
									</div>
									{editinfo !== undefined ? (
										<EditSize
											UpdateForm={UpdateForm}
											proid={editinfo.id}
											setpicksize={setpicksize}
											picksize={picksize}
											sizeload={sizeload}
										/>
									) : (
										""
									)}
								</div>
							</div>
							<div className="editcatalog-input-name">
								<span className="label" htmlFor="">
									Color
								</span>

								<div className="editcatalog-display-colors-wrapper">
									<div className="editcatalog-choice-input-sizes-wrapper">
										{editinfo !== undefined ? (
											<>
												{Children.toArray(
													editinfo.pickcolor.map(
														(c) => (
															<span
																className="editcatalog-choice-input-colors-container"
																style={{
																	backgroundColor: `${c.color}`,
																	animationDuration: `${c.animationDuration}`,
																	animationName: `${c.animationName}`,
																}}>
																<span
																	onClick={() =>
																		deleteColor(
																			c.id
																		)
																	}>
																	<IClose
																		iwidth="16"
																		iheight="16"
																	/>
																</span>
															</span>
														)
													)
												)}
											</>
										) : (
											""
										)}
									</div>
									{editinfo !== undefined ? (
										<EditColor
											UpdateForm={UpdateForm}
											proid={editinfo.id}
											setpickcolor={setpickcolor}
											pickcolor={pickcolor}
											colorload={colorload}
										/>
									) : (
										""
									)}
								</div>
							</div>
							<form
								onSubmit={(e) =>
									UpdateForm(
										e,
										editinfo.id,
										description,
										setdescription,
										"description"
									)
								}
								className="editcatalog-textarea">
								<label htmlFor="">Description</label>
								{editinfo !== undefined ? (
									<textarea
										onChange={(e) =>
											dataOnChange(e, "description")
										}
										placeholder="Write product description here..."
										name="description"
										id="description"
										cols="30"
										rows="10"
										value={description}
										required></textarea>
								) : (
									""
								)}
								<button
									disabled={
										descripload === false ? false : true
									}
									type="submit">
									{descripload === false ? (
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
											<Loader
												cwidth="12px"
												cheight="12px"
											/>
										</div>
									)}
								</button>
							</form>
						</div>
					</div>
				</div>
			</AnimateTransition>
			<SuccessPlate
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={namesucc}
				SucMessage="Name update success"
			/>
			<SuccessPlate
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={pricesucc}
				SucMessage="Name update success"
			/>
			<SuccessPlate
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={discountsucc}
				SucMessage="Discount update success"
			/>
			<SuccessPlate
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={stocksucc}
				SucMessage="Stock update success"
			/>
			<SuccessPlate
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={stnumsucc}
				SucMessage="Name update success"
			/>
			<SuccessPlate
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={catsucc}
				SucMessage="Catalog update success"
			/>
			<SuccessPlate
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={descripsucc}
				SucMessage="Name update success"
			/>
			<SuccessPlate
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={colorsucc}
				SucMessage="Color update success"
			/>
			<SuccessPlate
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={sizesucc}
				SucMessage="Size update success"
			/>
			<SuccessPlate
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={file1succ}
				SucMessage="File one update success"
			/>

			<SuccessPlate
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={file2succ}
				SucMessage="File two updated success"
			/>
			<SuccessPlate
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={file3succ}
				SucMessage="file three update success"
			/>
			<SuccessPlate
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={file4succ}
				SucMessage="file four update success"
			/>
			<SuccessPlate
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={uploadSuccess}
				SucMessage="file update success"
			/>
			<ErrorPlate
				promptClassName="errorplate-container"
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={uploadError}
				ErrMessage="Oops file upload error"
			/>
			<ErrorPlate
				promptClassName="errorplate-container"
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={imageDimensionPrompt}
				ErrMessage="Image is too small for a banner"
			/>
			<ErrorPlate
				promptClassName="errorplate-container"
				timeOut="750"
				EnterAnimate="BounceIn"
				ExitAnimate="BounceOut"
				detailsError={nofile}
				ErrMessage="Oops no file found"
			/>
		</>
	);
};

export default React.memo(EditCatalog);
