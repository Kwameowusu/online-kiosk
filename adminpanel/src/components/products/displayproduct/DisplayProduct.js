import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../../common/Search";
// import img1 from "../../images/img1.jpg";
import DeleteCatalog from "../../overlay.js/DeleteCatalog";
import EditCatalog from "../../overlay.js/EditCatalog";
import Catalog from "./Catalog";
import Loader from "../../common/Loader";
import { MyContext } from "../../../contextapi/MyProvider";
import { ISearch, Upload } from "../../common/icons/Icons";

const DisplayProduct = () => {
	const [editclose, seteditclose] = useState(null);
	const [deleteclose, setdeleteclose] = useState(null);
	const [dsearch, setdsearch] = useState(false);
	const { nextbatch, loader, fetchData3, products, fetchData2 } =
		useContext(MyContext);
	const [deleteinfo, setdeleteinfo] = useState({});
	const [editinfo, seteditinfo] = useState();

	const PopDelete = (deleteid, productsImages, probanner) => {
		setdeleteinfo({
			deleteid,
			productsImages,
			probanner,
		});
	};
	// console.log("llllll");

	const PopEdit = (pro) => {
		seteditinfo(pro);
	};

	useEffect(() => {
		// console.log("jj");
		let options = {
			root: null,
			rootMargin: "0px",
			threshold: 1.0,
		};

		let observer = new IntersectionObserver(fetchData2, options);
		if (loader.current) {
			observer.observe(loader.current);
		}
		let gg = loader.current;
		// console.log(loader.current);

		return () => {
			if (gg) {
				observer.unobserve(gg);
			}
		};
	}, [fetchData2, loader]);

useEffect(() => {
	if (editclose === true) {
		document.querySelector("body").style.overflow = "hidden";
	}
	if (editclose === null || editclose === false)
		document.querySelector("body").style.overflow = "initial";
}, [editclose]);


	return (
		<>
			<div className="displayproduct-wrapper">
			
					<EditCatalog
						seteditclose={seteditclose}
						editclose={editclose}
						editinfo={editinfo}
						seteditinfo={seteditinfo}
					/>
				

				<DeleteCatalog
					deleteclose={deleteclose}
					setdeleteclose={setdeleteclose}
					deleteinfo={deleteinfo}
					collection="myproducts"
					folder="uploadt"
				/>

				<div className="displayproduct-wrapper-inner">
					{dsearch ? <Search setdsearch={setdsearch} /> : ""}
					<div className="displayproduct-container">
						<div className="displayproduct-header-container">
							<p className="displayproduct-header-text">
								All products
							</p>
							<span
								onClick={fetchData3}
								className="displayproduct-header-total">
								<p>
									{
										[
											...new Map(
												products.map((item) => [
													item.id,
													item,
												])
											).values(),
										].length
									}
								</p>
							</span>
							<span className="displayproduct-header-button-wrapper">
								<button
									onClick={() => setdsearch(true)}
									className="displayproduct-header-button">
									<p>Search</p>
									<ISearch iheight="16" iwidth="16" />
								</button>
							</span>
							<span className="displayproduct-header-button-wrapper1">
								<button className="displayproduct-header-button">
									<Link to="/displayproduct/addproduct">
										<Upload iwidth="16" iheight="16" />
									</Link>
								</button>
							</span>
						</div>

						{
							<Catalog
								setdeleteclose={setdeleteclose}
								seteditclose={seteditclose}
								PopDelete={PopDelete}
								PopEdit={PopEdit}
							/>
						}
					</div>
				</div>
				{nextbatch ? (
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
				<div ref={loader} className="catalog-bottom"></div>
			</div>
		</>
	);
};

export default DisplayProduct;
