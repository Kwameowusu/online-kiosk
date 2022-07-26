import { useContext } from "react";

import { doc, deleteDoc } from "firebase/firestore";
import { MyContext } from "../../contextapi/MyProvider";
import { getStorage, ref, deleteObject } from "firebase/storage";

import db from "../../firebase";
import { realDelete } from "./real-delete";
import { MyOrderContext } from "../../contextapi/OrderProvider";
export const useDeleteSomething = () => {
	const {
		setproducts,
		products,
		kioskbanner,
		setkioskbanner,

		
		coverimage,
		setcoverimage,kiosklogo, setkiosklogo,
	} = useContext(MyContext);
	const {orders,setorders,} = useContext(MyOrderContext)

	const deleteDetails = async (
		id,
		productsImages,
		probanner,
		setdelonload,
		setdeleteclose,
		collection,
		folder
	) => {
		setdelonload(true);

		try {
			if (collection === "myproducts") {
				await deleteDoc(doc(db, `${collection}`, `${id}`));
				const yy = products.filter((p) => p.id !== id);
				setproducts(yy);
				setdelonload(false);
				if (setdeleteclose instanceof Function) {
					setdeleteclose(false);
				}
				if (productsImages !== "" || probanner !== "") {
					deleteImages(
						id,
						productsImages,
						probanner,
						setdelonload,
						setdeleteclose,
						folder
					);
				}
			}
			if (collection === "allorders") {
			realDelete(id)

				const y = orders.filter((p) => p.oid !== id);
				console.log(orders)
				setorders(y);
				setdelonload(false);
				if (setdeleteclose instanceof Function) {
					setdeleteclose(false);
				}
				if (productsImages !== "" || probanner !== "") {
					deleteImages(
						id,
						productsImages,
						probanner,
						setdelonload,
						setdeleteclose,
						folder
					);
				}
			}
			if (collection === "kioskcover") {
				await deleteDoc(doc(db, `${collection}`, `${id}`));

				const y = coverimage.filter((p) => p.oid !== id);
				setcoverimage(y);
				setdelonload(false);
				if (setdeleteclose instanceof Function) {
					setdeleteclose(false);
				}
				if (productsImages !== "" || probanner !== "") {
					deleteImages(
						id,
						productsImages,
						probanner,
						setdelonload,
						setdeleteclose,
						folder
					);
				}
			}
			if (collection === "kiosklogo") {
				await deleteDoc(doc(db, `${collection}`, `${id}`));

				const y = kiosklogo.filter((p) => p.oid !== id);
				setkiosklogo(y);
				setdelonload(false);
				if (setdeleteclose instanceof Function) {
					setdeleteclose(false);
				}
				if (productsImages !== "" || probanner !== "") {
					deleteImages(
						id,
						productsImages,
						probanner,
						setdelonload,
						setdeleteclose,
						folder
					);
				}
			}
			if (collection === "kioskbanner") {
				await deleteDoc(doc(db, `${collection}`, `${id}`));

				const y = kioskbanner.filter((p) => p.oid !== id);
				setkioskbanner(y);
				setdelonload(false);
				if (setdeleteclose instanceof Function) {
					setdeleteclose(false);
				}
				console.log("productImages" + productsImages);
				if (productsImages !== "" || probanner !== "") {
					deleteImages(
						id,
						productsImages,
						probanner,
						setdelonload,
						setdeleteclose,
						folder
					);
				}
			}
		} catch (error) {
			console.log(error);
			setdelonload(false);
		}
	};
	const deleteImages = (
		id,
		productsImages,
		probanner,
		setdelonload,
		setdeleteclose,
		folder
	) => {
		const storage = getStorage();
		if (productsImages) {
			Object.keys(productsImages).forEach((b) => {
				// Create a reference to the file to delete

				const desertRef = ref(
					storage,
					`/${folder}/${productsImages[b].filename}`
				);

				// Delete the file
				deleteObject(desertRef)
					.then(() => {
						console.log(" File deleted successfully");
						// File deleted successfully
					})
					.catch((error) => {
						console.log(error);
					});
			});
		}
		console.log("lllll");

		if (probanner.filename) {
			const desertRef = ref(storage, `/${folder}/${probanner.filename}`);
			// Delete the file
			deleteObject(desertRef)
				.then(() => {
					console.log(" Banner deleted successfully");
					// File deleted successfully
					console.log(probanner);
					if (probanner) {
						const yy = products.filter((p) => p.id !== id);
						setproducts(yy);
						const y = kioskbanner.filter((p) => p.banid !== id);
						setkioskbanner(y);
						const ym = coverimage.filter((p) => p.cid !== id);
						console.log(ym);
						setcoverimage(ym);
						const yk = kiosklogo.filter((p) => p.klid !== id);
						console.log(yk);
						setkiosklogo(yk)
					}

					setdelonload(false);
					if (setdeleteclose instanceof Function) {
						setdeleteclose(false);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	return [deleteDetails];
};
