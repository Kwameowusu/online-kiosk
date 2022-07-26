import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase";

export const SubmitForm = (compressedFile, ImgeUrl, filecolor, setImgUrl) => {
	const aFormSubmit = async (
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
		setemptyvalue,
		setemptystock,
		selectcat
	) => {
		e.preventDefault();
		try {
			console.log(stock);
			if (stock === undefined || stock === null || stock === "") {
				setemptystock(true);
				setTimeout(() => {
					setemptystock(false);
				}, 4000);
				return;
			}
			if (ImgeUrl === null || Object.keys(ImgeUrl).length !== 4) {
				setemptyvalue(true);
				setTimeout(() => {
					setemptyvalue(false);
				}, 4000);
				return;
			}
			setloadsub(true);
			await addDoc(collection(db, "myproducts"), {
				name: name,
				price: Number(price),
				discount: Number(discount),
				oldprice: Number(price),
				stock: stock || "",
				stockNumber: Number(stocknumber),
				description: description,
				createdAt: new Date(),
				pickcolor: pickcolor || "",
				picksize: picksize || "",
				isChecked: true,
				count: Number(1),
				category: selectcat[0],
				productsImages: {
					image1: {
						filename: compressedFile.cf1,
						url: ImgeUrl.url1,
						color: filecolor.cl1,
					},
					image2: {
						filename: compressedFile.cf2,
						url: ImgeUrl.url2,
						color: filecolor.cl2,
					},
					image3: {
						filename: compressedFile.cf3,
						url: ImgeUrl.url3,
						color: filecolor.cl3,
					},
				},
				productBanner: {
					filename: compressedFile.cf4,
					url: ImgeUrl.url4,
					color: filecolor.cl4,
				},
			});
			if (
				setname instanceof Function &&
				setprice instanceof Function &&
				setdiscount instanceof Function &&
				setstock instanceof Function &&
				setstocknumber instanceof Function &&
				setdescription instanceof Function &&
				setImgUrl instanceof Function &&
				setpickcolor instanceof Function &&
				setpicksize instanceof Function
			) {
				setloadsub(false);
				setname("");
				setprice("");
				setdiscount("");
				setstock();
				setstocknumber("");
				setdescription("");
				setImgUrl(null);
				setpickcolor([]);
				setpicksize([]);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return [aFormSubmit];
};
