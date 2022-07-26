import { useState, useContext } from "react";

import { doc, updateDoc } from "firebase/firestore";

import db from "../../firebase";
import { MyContext } from "../../contextapi/MyProvider";

export const UpdateFormWrapper = (
	compressedFile,
	ImgeUrl,
	filecolor,
	setImgUrl
) => {
	const [nameload, setnameload] = useState(false);
	const [priceload, setpriceload] = useState(false);
	const [discountload, setdiscountload] = useState(false);
	const [stockload, setstockload] = useState(false);
	const [stnumload, setstnumload] = useState(false);
	const [catload, setcatload] = useState(false);

	const [descripload, setdescripload] = useState(false);
	const [colorload, setcolorload] = useState(false);
	const [sizeload, setsizeload] = useState(false);
	const [file1load, setfile1load] = useState(false);
	const [file2load, setfile2load] = useState(false);
	const [file3load, setfile3load] = useState(false);
	const [file4load, setfile4load] = useState(false);

	const [namesucc, setnamesucc] = useState(null);
	const [pricesucc, setpricesucc] = useState(null);
	const [discountsucc, setdiscountsucc] = useState(null);
	const [stocksucc, setstocksucc] = useState(null);
	const [stnumsucc, setstnumsucc] = useState(null);
	const [catsucc, setcatsucc] = useState(null);
	const [descripsucc, setdescripsucc] = useState(null);
	const [colorsucc, setcolorsucc] = useState(null);
	const [sizesucc, setsizesucc] = useState(null);
	const [file1succ, setfile1succ] = useState(null);
	const [file2succ, setfile2succ] = useState(null);
	const [file3succ, setfile3succ] = useState(null);
	const [file4succ, setfile4succ] = useState(null);

	const { products, setproducts } = useContext(MyContext);

	const UpdateForm = async (e, id, aform, setaform, field) => {
		e.preventDefault();
		try {
			if (!aform) return;

			const formRef = doc(db, "myproducts", id);

			switch (field) {
				case "name":
					if (aform === undefined || aform === "" || aform === null)
						return;
					setnameload(true);
					await updateDoc(formRef, {
						name: aform,
					});

					setnameload(false);
					setnamesucc(true);
					const uu = products.map((pp) => {
						if (pp.id === id) {
							pp.name = aform;
						}
						return pp;
					});
					setproducts(uu);
					setTimeout(() => {
						setnamesucc(false);
					}, 4000);

					break;
				case "price":
					if (aform === undefined || aform === "" || aform === null)
						return;
					setpriceload(true);
					await updateDoc(formRef, {
						price: aform,
					});

					setpriceload(false);
					setpricesucc(true);
					const gg = products.map((pp) => {
						if (pp.id === id) {
							pp.price = aform;
						}
						return pp;
					});
					setproducts(gg);
					setTimeout(() => {
						setpricesucc(false);
					}, 4000);
					break;
				case "discount":
					if (aform === undefined || aform === "" || aform === null)
						return;
					setdiscountload(true);
					await updateDoc(formRef, {
						discount: aform,
					});

					setdiscountload(false);
					setdiscountsucc(true);
					const yu = products.map((pp) => {
						if (pp.id === id) {
							pp.discount = aform;
						}
						return pp;
					});
					setproducts(yu);
					setTimeout(() => {
						setdiscountsucc(false);
					}, 4000);
					break;
				case "stock":
					if (aform === undefined || aform === "" || aform === null)
						return;
					setstockload(true);
					await updateDoc(formRef, {
						stock: aform,
					});

					setstockload(false);
					setstocksucc(true);
					const nn = products.map((pp) => {
						if (pp.id === id) {
							pp.stock = aform;
						}
						return pp;
					});
					setproducts(nn);
					setTimeout(() => {
						setstocksucc(false);
					}, 4000);
					break;

				case "stocknumber":
					if (aform === undefined || aform === "" || aform === null)
						return;
					setstnumload(true);
					await updateDoc(formRef, {
						stockNumber: Number(aform),
					});

					setstnumload(false);
					setstnumsucc(true);
					const vv = products.map((pp) => {
						if (pp.id === id) {
							pp.stockNumber = aform;
						}
						return pp;
					});
					setproducts(vv);
					setTimeout(() => {
						setstnumsucc(false);
					}, 4000);
					break;

				case "category":
					
					if (
						aform === undefined ||
						aform.length === 0 ||
						aform === null
					)
						return;
					setcatload(true);
					await updateDoc(formRef, {
						category: aform[0],
					});

					setcatload(false);
					setcatsucc(true);
					const cc = products.map((pp) => {
						if (pp.id === id) {
							pp.category = aform[0];
						}
						return pp;
					});
					setproducts(cc);
					setTimeout(() => {
						setcatsucc(false);
					}, 4000);
					setaform([]);
					break;

				case "description":
					if (aform === undefined || aform === "" || aform === null)
						return;
					setdescripload(true);
					await updateDoc(formRef, {
						description: aform,
					});

					setdescripload(false);
					setdescripsucc(true);
					const ff = products.map((pp) => {
						if (pp.id === id) {
							pp.description = aform;
						}
						return pp;
					});
					setproducts(ff);
					setTimeout(() => {
						setdescripsucc(false);
					}, 4000);
					break;

				case "color":
					if (
						aform === undefined ||
						aform.length === 0 ||
						aform === null
					)
						return;
					setcolorload(true);

					const qq = products.find((ii) => ii.id === id);
					await updateDoc(formRef, {
						pickcolor: [
							...new Map(
								[...qq.pickcolor, ...aform].map((item) => [
									item.color,
									item,
								])
							).values(),
						],
					});

					setcolorload(false);
					setcolorsucc(true);
					const kk = products.map((pp) => {
						if (pp.id === id) {
							setaform([]);
							pp.pickcolor = [
								...new Map(
									[...pp.pickcolor, ...aform].map((item) => [
										item.color,
										item,
									])
								).values(),
							];
						}
						return pp;
					});
					setproducts(kk);
					setTimeout(() => {
						setcolorsucc(false);
					}, 4000);
					setaform([]);

					break;

				case "size":
					if (
						aform === undefined ||
						aform.length === 0 ||
						aform === null
					)
						return;
					setsizeload(true);

					const ww = products.find((ii) => ii.id === id);
					await updateDoc(formRef, {
						picksize: [
							...new Map(
								[...ww.picksize, ...aform].map((item) => [
									item.size,
									item,
								])
							).values(),
						],
					});

					setsizeload(false);
					setsizesucc(true);
					const ee = products.map((pp) => {
						if (pp.id === id) {
							setaform([]);
							pp.picksize = [
								...new Map(
									[...pp.picksize, ...aform].map((item) => [
										item.size,
										item,
									])
								).values(),
							];
						}
						return pp;
					});
					setproducts(ee);
					setTimeout(() => {
						setsizesucc(false);
					}, 4000);
					setaform([]);

					break;

				case "file1":
					if (
						ImgeUrl === undefined ||
						ImgeUrl.length === 0 ||
						ImgeUrl === null
					)
						return;
					setfile1load(true);

					// const f1 = products.find((ii) => ii.id === id);
					await updateDoc(formRef, {
						"productsImages.image1.url": ImgeUrl.gurl,
						"productsImages.image1.filename": compressedFile.cf1,
						"productsImages.image1.color": filecolor.cl1,
					});
					console.log("jj");
					setfile1load(false);
					setfile1succ(true);

					setTimeout(() => {
						setfile1succ(false);
					}, 4000);
					setImgUrl(null);
					const f1 = products.map((pp) => {
						if (pp.id === id) {
							pp.productsImages.image1.url = ImgeUrl.gurl;
							pp.productsImages.image1.filename =
								compressedFile.cf1;
							pp.productsImages.image1.color = filecolor.cl1;
						}
						return pp;
					});
					setproducts(f1);

					break;

				case "file2":
					if (
						ImgeUrl === undefined ||
						ImgeUrl.length === 0 ||
						ImgeUrl === null
					)
						return;
					setfile2load(true);

					// const f1 = products.find((ii) => ii.id === id);
					await updateDoc(formRef, {
						"productsImages.image2.url": ImgeUrl.gurl,
						"productsImages.image2.filename": compressedFile.cf2,
						"productsImages.image2.color": filecolor.cl2,
					});

					setfile2load(false);
					setfile2succ(true);

					setTimeout(() => {
						setfile2succ(false);
					}, 4000);
					setImgUrl(null);
					const f2 = products.map((pp) => {
						if (pp.id === id) {
							pp.productsImages.image2.url = ImgeUrl.gurl;
							pp.productsImages.image2.filename =
								compressedFile.cf2;
							pp.productsImages.image2.color = filecolor.cl2;
						}
						return pp;
					});
					setproducts(f2);

					break;

				case "file3":
					if (
						ImgeUrl === undefined ||
						ImgeUrl.length === 0 ||
						ImgeUrl === null
					)
						return;
					setfile3load(true);

					// const f1 = products.find((ii) => ii.id === id);
					await updateDoc(formRef, {
						"productsImages.image3.url": ImgeUrl.gurl,
						"productsImages.image3.filename": compressedFile.cf3,
						"productsImages.image3.color": filecolor.cl3,
					});

					setfile3load(false);
					setfile3succ(true);
					setproducts(ee);
					setTimeout(() => {
						setfile3succ(false);
					}, 4000);
					setImgUrl(null);
					const f3 = products.map((pp) => {
						if (pp.id === id) {
							pp.productsImages.image3.url = ImgeUrl.gurl;
							pp.productsImages.image3.filename =
								compressedFile.cf3;
							pp.productsImages.image3.color = filecolor.cl3;
						}
						return pp;
					});
					setproducts(f3);
					break;

				case "file4":
					if (
						ImgeUrl === undefined ||
						ImgeUrl.length === 0 ||
						ImgeUrl === null
					)
						return;
					setfile4load(true);

					// const f1 = products.find((ii) => ii.id === id);
					await updateDoc(formRef, {
						"productBanner.url": ImgeUrl.gurl,
						"productBanner.filename": compressedFile.cf4,
						"productBanner.color": filecolor.cl4,
					});

					setfile4load(false);
					setfile4succ(true);
					setTimeout(() => {
						setfile4succ(false);
					}, 4000);
					setImgUrl(null);
					const f4 = products.map((pp) => {
						if (pp.id === id) {
							pp.productBanner.url = ImgeUrl.gurl;
							pp.productBanner.filename = compressedFile.cf4;
							pp.productBanner.color = filecolor.cl4;
						}
						return pp;
					});
					setproducts(f4);

					break;

				default:
					break;
			}
		} catch (error) {
			console.log(error);
		}
	};
	return [
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
	];
};
