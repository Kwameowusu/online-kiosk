import React, { createContext, useRef, useState, useEffect } from "react";
import {
	collection,
	orderBy,
	startAfter,
	startAt,
	limit,
	query,
	getDocs,
	addDoc
} from "firebase/firestore";
import db from "../../components/firebase";
import { getIp } from "../utils/get-Ip";

export const MyContext = createContext("");

const MyProvider = ({ children }) => {
	const [products, setproducts] = useState([]);
	const [search, setsearch] = useState();
	const [nextbatch, setnextbatch] = useState(false);
	const loader = useRef(null);
	const lastproduct = useRef("");
	let hh;

	const [getsize, setgetsize] = useState([]);
	const [getcolor, setgetcolor] = useState([]);
	const [addproducterror, setaddproducterror] = useState(null);
	const [getproductsinbag, setgetproductsinbag] = useState([]);
	const [getviewedproducts, setgetviewedproducts] = useState([]);
	const [editclose, seteditclose] = useState(null);
	const [opencart, setopencart] = useState(null);
	const [opendetails, setopendetails] = useState(null);
	const [openpay, setopenpay] = useState(null);
	const [checkcartempty, setcheckcartempty] = useState(null);
	const [phoneerror, setphoneerror] = useState(null);
	const [regionerror, setregionerror] = useState(null);
	const [reglocerror, setreglocerror] = useState(null);
	const [delverage, setdelverage] = useState([]);

	const [totalprice, settotalprice] = useState();
	const [stockover, setstockover] = useState(null);
	const [stockover1, setstockover1] = useState(null);
	const [cartnotempty, setcartnotempty] = useState(null);
	const [deliveryfee, setdeliveryfee] = useState([]);
	const [code, setcode] = useState();
	const [apay, setapay] = useState({});
	const [getbrands, setgetbrands] = useState([]);
	const [getabout, setgetabout] = useState([]);
	const [getprivacy, setgetprivacy] = useState([]);
	const [openabout, setopenabout] = useState(null);
	const [openprivacy, setopenprivacy] = useState(null);
	const [getlogo, setgetlogo] = useState([]);
	const [merchid, setmerchid] = useState([]);
	const [storedetails, setstoredetails] = useState([]);

	//Bag products
	useEffect(() => {
		let storedItems = JSON.parse(localStorage.getItem("bagitems"));
		if (storedItems) {
			setgetproductsinbag(JSON.parse(JSON.stringify(storedItems)));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("bagitems", JSON.stringify(getproductsinbag));
	}, [getproductsinbag]);

	//Viewed Products
	useEffect(() => {
		let viewedItems = JSON.parse(localStorage.getItem("vieweditems"));
		if (viewedItems) {
			setgetviewedproducts(JSON.parse(JSON.stringify(viewedItems)));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			"vieweditems",
			JSON.stringify([
				...new Map(
					getviewedproducts.map((item) => [item.id, item])
				).values(),
			])
		);
	}, [getviewedproducts]);
	//paaaay
	useEffect(() => {
		let storedItems = localStorage.getItem("apay");
		if (storedItems) {
			setapay(JSON.parse(storedItems));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("apay", JSON.stringify(apay));
	}, [apay]);

	useEffect(() => {
		let storedDetails = localStorage.getItem("storedDetails");
		if (storedDetails) {
			setstoredetails(JSON.parse(storedDetails));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("storedDetails", JSON.stringify(storedetails));
	}, [storedetails]);

	const GetViewedProduct = (aproduct) => {
		setgetviewedproducts((prev) => [
			...new Map(
				[...prev, JSON.parse(JSON.stringify(aproduct))].map((item) => [
					item.id,
					item,
				])
			).values(),
		]);
	};

	const PutProductInBag = (getacolor, getasize, data, id) => {
		setgetproductsinbag((prev) => [
			...prev,
			JSON.parse(JSON.stringify({ getacolor, getasize, data, id: id })),
		]);
	};

	const fetchData = async () => {
		const querySnapshot = await getDocs(
			query(
				collection(db, "myproducts"),
				orderBy("createdAt"),
				startAt(5),
				limit(1)
			)
		);

		const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

		lastproduct.current = lastVisible;

		querySnapshot.forEach((doc) => {
			setproducts((prev) => [...prev, { ...doc.data(), id: doc.id }]);
		});
	};
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData2 = async (entries) => {
		const [entry] = entries;

		if (hh instanceof Array && hh.length === 0) return;

		if (!entry.isIntersecting) return;

		if (entry.isIntersecting) {
			setnextbatch(true);
		}
		const querySnapshot = await getDocs(
			query(
				collection(db, "myproducts"),
				orderBy("createdAt"),
				startAfter(lastproduct.current || 0),
				limit(10)
			)
		);
		hh = querySnapshot.docs;

		querySnapshot.forEach((doc) => {
			setproducts((prev) => [...prev, { ...doc.data(), id: doc.id }]);

			if ([{ ...doc.data(), id: doc.id }]) {
				lastproduct.current = "";
			}
		});
		setnextbatch(false);

		const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
		if (lastVisible) {
			lastproduct.current = lastVisible;
		}
	};

	const fetchDelverage = async () => {
		const querySnapshot = await getDocs(
			query(collection(db, "deliverycoverage"))
		);

		querySnapshot.forEach((doc) => {
			setdelverage((prev) => [...prev, { ...doc.data(), delid: doc.id }]);
		});
	};

	useEffect(() => {
		fetchDelverage();
	}, []);

	const fetchDeliveryfees = async () => {
		const querySnapshot = await getDocs(
			query(collection(db, "deliveryfee"))
		);

		querySnapshot.forEach((doc) => {
			setdeliveryfee((prev) => [
				...prev,
				{ ...doc.data(), feeid: doc.id },
			]);
		});
	};

	useEffect(() => {
		fetchDeliveryfees();
	}, []);

	const fetchBrands = async () => {
		const querySnapshot = await getDocs(query(collection(db, "brands")));

		querySnapshot.forEach((doc) => {
			setgetbrands((prev) => [
				...prev,
				{ ...doc.data(), brandid: doc.id },
			]);
		});
	};

	useEffect(() => {
		fetchBrands();
	}, []);

	const fetchAbout = async () => {
		const querySnapshot = await getDocs(query(collection(db, "about")));

		querySnapshot.forEach((doc) => {
			setgetabout((prev) => [...prev, { ...doc.data(), aboid: doc.id }]);
		});
	};

	useEffect(() => {
		fetchAbout();
	}, []);

	const fetchPrivacy = async () => {
		const querySnapshot = await getDocs(query(collection(db, "privacy")));

		querySnapshot.forEach((doc) => {
			setgetprivacy((prev) => [
				...prev,
				{ ...doc.data(), privid: doc.id },
			]);
		});
	};
	

	useEffect(() => {
		fetchPrivacy();
	}, []);

	const fetchLogo = async () => {
		const querySnapshot = await getDocs(query(collection(db, "kiosklogo")));

		querySnapshot.forEach((doc) => {
			setgetlogo((prev) => [...prev, { ...doc.data(), klid: doc.id }]);
		});
	};

	useEffect(() => {
		fetchLogo();
	}, []);

	// const fetchKioskBanner = async () => {
	// 	const querySnapshot = await getDocs(
	// 		query(collection(db, "kioskbanner"))
	// 	);

	// 	querySnapshot.forEach((doc) => {
	// 		setkioskbanner((prev) => [
	// 			...prev,
	// 			{ ...doc.data(), banid: doc.id },
	// 		]);
	// 	});
	// };

	// useEffect(() => {
	// 	fetchKioskBanner();
	// }, []);

	const fetchMerch = async () => {
		const querySnapshot = await getDocs(query(collection(db, "merchid")));

		querySnapshot.forEach((doc) => {
			setmerchid((prev) => [...prev, { ...doc.data(), mid: doc.id }]);
		});
	};
	// console.log(orders)
	useEffect(() => {
		fetchMerch();
	}, []);

	useEffect(() => {
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
		return () => {
			if (gg) {
				observer.unobserve(gg);
			}
		};
	}, []);

	const [userview, setuserview] = useState("");
	useEffect(() => {
		// console.log(navigator.userAgent);
		try {
			
			getIp(setuserview);
		} catch (error) {
			console.log(error);
		}
	}, []);
	useEffect(() => {
		(async () => {
			if (userview.ip !== undefined) {
				await addDoc(collection(db, "userview"), {
					...userview,
					createdAt: new Date(),
				});
			}
			// console.log(userview.ip)
		})();
	}, [userview]);

	return (
		<MyContext.Provider
			value={{
				products,
				setproducts,
				search,
				setsearch,
				nextbatch,
				setnextbatch,
				loader,
				getsize,
				setgetsize,
				getcolor,
				setgetcolor,
				PutProductInBag,
				addproducterror,
				setaddproducterror,
				getproductsinbag,
				setgetproductsinbag,
				editclose,
				seteditclose,
				opencart,
				setopencart,
				totalprice,
				settotalprice,
				stockover,
				setstockover,
				stockover1,
				setstockover1,
				opendetails,
				setopendetails,
				openpay,
				setopenpay,
				getviewedproducts,
				setgetviewedproducts,
				GetViewedProduct,
				checkcartempty,
				setcheckcartempty,
				delverage,
				cartnotempty,
				setcartnotempty,
				deliveryfee,
				setdeliveryfee,
				code,
				setcode,
				reglocerror,
				setreglocerror,
				regionerror,
				setregionerror,
				phoneerror,
				setphoneerror,
				apay,
				setapay,
				getbrands,
				setgetbrands,
				getprivacy,
				setgetprivacy,
				getabout,
				setgetabout,
				openprivacy,
				setopenprivacy,
				openabout,
				setopenabout,
				// kioskbanner,
				// setkioskbanner,
				merchid,
				setmerchid,
				storedetails,
				setstoredetails,
				getlogo
			}}>
			{children}
		</MyContext.Provider>
	);
};

export default MyProvider;
