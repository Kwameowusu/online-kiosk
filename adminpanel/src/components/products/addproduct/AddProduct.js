// @flow
import { useState, useContext } from "react";
import Loader from "../../common/Loader";
import { ErrorPlate, SuccessPlate, AlertPlate } from "../../common/ErrorPlate";
import { EachOnChange } from "../../util/Onchange";
import UploadImages from "../../util/UploadImages";
import { EachDataOnChange } from "../../util/EachDataOnChange";
import { SubmitForm } from "../../util/SubmitForm";
import AddSize from "./AddSize";
import AddColor from "./AddColor";
import { MyContext } from "../../../contextapi/MyProvider";

const AddProduct = () => {
	const { category } = useContext(MyContext);
	const [
		nofile,
		uploadSuccess,
		uploadInProgress,
		SubmitAllFile,
		UploadError,
		ImgeUrl,
		setImgUrl,
	] = UploadImages();
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
		dataOnChange,
		name,
		price,
		discount,
		stock,
		stocknumber,
		description,
		pickcolor,
		picksize,
		setname,
		setprice,
		setdiscount,
		setstock,
		setstocknumber,
		setdescription,
		setpickcolor,
		setpicksize,
	] = EachDataOnChange();

	const [AFormSubmit] = SubmitForm(
		compressedFile,
		ImgeUrl,
		filecolor,
		setImgUrl
	);

	const [loadsub, setloadsub] = useState(false);
	const [emptyvalue, setemptyvalue] = useState(false);
	const [emptystock, setemptystock] = useState(false);
	const [selectcat, setselectcat] = useState([]);

	const SelectCategory = (cat) => {
		if (category.some((e) => e.id === selectcat.id)) {
			setselectcat([]);

			return;
		}
		setselectcat([cat]);
	};

	return (
		<>
			<div className="addproduct-wrapper">
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
				<ErrorPlate
					promptClassName="errorplate-container"
					timeOut="750"
					EnterAnimate="BounceIn"
					ExitAnimate="BounceOut"
					detailsError={UploadError}
					ErrMessage="Oops file upload error"
				/>
				<SuccessPlate
					promptClassName="successplate-container"
					timeOut="750"
					// timeStay="4000"
					EnterAnimate="BounceIn"
					ExitAnimate="BounceOut"
					detailsError={uploadSuccess}
					SucMessage="file upload success"
				/>
				<AlertPlate
					// promptClassName="alertplate-container"
					timeOut="750"
					EnterAnimate="SlideInDown"
					ExitAnimate="SlideOutUp"
					// detailsError={true}
					// SucMessage="file upload success"
					ImageUrl={ImgeUrl}
					setImgUrl={setImgUrl}
					compressedFile={compressedFile}
				/>
				<ErrorPlate
					promptClassName="remindplate-container"
					timeOut="750"
					EnterAnimate="SlideInDown"
					ExitAnimate="SlideOutUp"
					detailsError={emptyvalue}
					ErrMessage="Make sure you have uploaded images"
				/>
				<ErrorPlate
					promptClassName="remindplate-container"
					timeOut="750"
					EnterAnimate="SlideInDown"
					ExitAnimate="SlideOutUp"
					detailsError={emptystock}
					ErrMessage="Add stock status"
				/>
				<div className="addproduct-container">
					<div className="addproduct-header-container">
						<p className="addproduct-header-text">Add products</p>
					</div>
					<form
						onSubmit={(e) =>
							SubmitAllFile(
								e,
								allCompressedImages,
								setallCompressedImages
							)
						}
						className="addproduct-image-form">
						<div
							style={{
								opacity:
									ImgeUrl !== null
										? Object.keys(ImgeUrl).length === 4
											? "0.2"
											: "0.8"
										: 0.8,
							}}
							className="addproduct-input-image-wrapper">
							<div className="addproduct-input-image-container">
								{Number(anupload) === 1 ? (
									<div
										style={{
											width: "100%",
											height: "25px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											opacity: "0.8",
										}}>
										<Loader cwidth="14px" cheight="14px" />
									</div>
								) : (
									<label htmlFor="file">
										Product image one
									</label>
								)}
							</div>
							<input
								onChange={(e) => OnChange(e, 1)}
								onClick={({ target }) => {
									target.value = null;
								}}
								type="file"
								name="file"
								required
								id=""
								disabled={
									ImgeUrl !== null
										? Object.keys(ImgeUrl).length === 4
											? true
											: false
										: false
								}
							/>
						</div>
						<div
							style={{
								opacity:
									ImgeUrl !== null
										? Object.keys(ImgeUrl).length === 4
											? "0.2"
											: "0.8"
										: "0.8",
							}}
							className="addproduct-input-image-wrapper">
							<div className="addproduct-input-image-container">
								{Number(anupload) === 2 ? (
									<div
										style={{
											width: "100%",
											height: "25px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											opacity: "0.8",
										}}>
										<Loader cwidth="14px" cheight="14px" />
									</div>
								) : (
									<label htmlFor="file">
										Product image two
									</label>
								)}
							</div>
							<input
								onChange={(e) => OnChange(e, 2)}
								onClick={({ target }) => {
									target.value = null;
								}}
								type="file"
								name="file"
								required
								id=""
								disabled={
									ImgeUrl !== null
										? Object.keys(ImgeUrl).length === 4
											? true
											: false
										: false
								}
							/>
						</div>{" "}
						<div
							style={{
								opacity:
									ImgeUrl !== null
										? Object.keys(ImgeUrl).length === 4
											? "0.2"
											: "0.8"
										: 0.8,
							}}
							className="addproduct-input-image-wrapper">
							<div className="addproduct-input-image-container">
								{Number(anupload) === 3 ? (
									<div
										style={{
											width: "100%",
											height: "25px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											opacity: "0.8",
										}}>
										<Loader cwidth="14px" cheight="14px" />
									</div>
								) : (
									<label htmlFor="file">
										Product image three
									</label>
								)}
							</div>
							<input
								onChange={(e) => OnChange(e, 3)}
								onClick={({ target }) => {
									target.value = null;
								}}
								type="file"
								name="file"
								required
								id=""
								disabled={
									ImgeUrl !== null
										? Object.keys(ImgeUrl).length === 4
											? true
											: false
										: false
								}
							/>
						</div>{" "}
						<div
							style={{
								opacity:
									ImgeUrl !== null
										? Object.keys(ImgeUrl).length === 4
											? "0.2"
											: "0.8"
										: 0.8,
							}}
							className="addproduct-input-image-wrapper">
							<div className="addproduct-input-image-container">
								{Number(anupload) === 4 ? (
									<div
										style={{
											width: "100%",
											height: "25px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											opacity: "0.8",
										}}>
										<Loader cwidth="14px" cheight="14px" />
									</div>
								) : (
									<label htmlFor="file">
										Product banner (min:900 x 900)
									</label>
								)}
							</div>
							<input
								onChange={(e) => OnChange(e, 4)}
								onClick={({ target }) => {
									target.value = null;
								}}
								type="file"
								name="file"
								required
								id=""
								disabled={
									ImgeUrl !== null
										? Object.keys(ImgeUrl).length === 4
											? true
											: false
										: false
								}
							/>
						</div>
						<div className="addproduct-submit">
							<button
								style={{
									opacity:
										ImgeUrl !== null
											? Object.keys(ImgeUrl).length === 4
												? "0.2"
												: "0.8"
											: 1,
								}}
								type="submit"
								disabled={
									ImgeUrl !== null
										? Object.keys(ImgeUrl).length === 4
											? true
											: false
										: false
								}>
								{uploadInProgress === "done" ? (
									<p>Upload Product Images</p>
								) : (
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											height: "25px",
											width: "100%",

											opacity: "0.8",
										}}>
										<Loader cwidth="18px" cheight="18px" />
									</div>
								)}
							</button>
						</div>
					</form>
					<form
						onSubmit={(e) =>
							AFormSubmit(
								e,
								name,
								price,
								discount,
								stock,
								stocknumber,
								description,
								pickcolor,
								picksize,
								setname,
								setprice,
								setdiscount,
								setstock,
								setstocknumber,
								setdescription,
								setpickcolor,
								setpicksize,
								setloadsub,
								setemptyvalue,setemptystock,
								selectcat
							)
						}
						action=""
						className="addproduct-image-form">
						<div className="addproduct-input-name">
							<label htmlFor="">Name</label>
							<input
								onChange={(e) => dataOnChange(e, "name")}
								type="text"
								name="text"
								id=""
								value={name}
								required
								placeholder="Enter product name"
							/>
						</div>
						<div className="addproduct-input-name">
							<label htmlFor="">Price</label>

							<input
								onChange={(e) => dataOnChange(e, "price")}
								type="number"
								name="number"
								id=""
								value={price}
								required
								placeholder="Enter product price"
							/>
						</div>
						<div className="addproduct-input-name">
							<label htmlFor="">Discount</label>

							<input
								onChange={(e) => dataOnChange(e, "discount")}
								type="number"
								name="discount"
								id=""
								value={discount}
								required
								placeholder="Enter product discount"
							/>
						</div>
						<div className="addproduct-input-stock">
							<label htmlFor="">Stock</label>
							<div className="addproduct-stock-check">
								{}
								<div>
									<input
										onChange={(e) =>
											dataOnChange(e, "stock")
										}
										type="radio"
										name="stock"
										id="In stock"
										required
									/>
									<label htmlFor="In stock">In stock</label>
								</div>

								<div>
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
							</div>
						</div>
						<div className="addproduct-input-name">
							<label htmlFor="">Number of stock</label>

							<input
								onChange={(e) => dataOnChange(e, "stocknumber")}
								type="number"
								name="number"
								id=""
								required
								value={stocknumber}
								placeholder="Enter product total stock"
							/>
						</div>
						<div className="addproduct-input-choice">
							<div className="addproduct-choice-category">
								<p>Product Category</p>
							</div>

							<div className="addproduct-choice-input-sizes">
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
											onClick={() => SelectCategory(b)}
											className="addproduct-category-button">
											{selectcat ? (
												selectcat.some(
													(e) => e.id === b.id
												) ? (
													<i className="la la-check"></i>
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
								<p onClick={() => setselectcat([])}>Clear</p>
							</span>
							</div>
							
						</div>
						<AddSize
							setpicksize={setpicksize}
							picksize={picksize}
						/>
						<AddColor
							setpickcolor={setpickcolor}
							pickcolor={pickcolor}
						/>
						<div className="addproduct-textarea">
							<label htmlFor="">Description</label>

							<textarea
								onChange={(e) => dataOnChange(e, "description")}
								placeholder="Write product description here..."
								name=""
								id=""
								cols="30"
								rows="10"
								value={description}
								required></textarea>
						</div>
						<div className="addproduct-submit">
							<button
								type="submit"
								disabled={loadsub === false ? false : true}>
								{loadsub === false ? (
									<p>Upload Product </p>
								) : (
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											height: "25px",
											width: "100%",

											opacity: "0.8",
										}}>
										<Loader cwidth="18px" cheight="18px" />
									</div>
								)}
							</button>

							{/* <button type="reset"></button> */}
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddProduct;
