import React, {
	createContext,
	useState,
	useRef,
	useEffect,
	// useCallback,
} from "react";
import {
	collection,
	orderBy,
	startAfter,
	limit,
	query,
	getDocs,
} from "firebase/firestore";
// import { getDatabase, ref, onValue } from "firebase/database";

import db from "../firebase";

export const MyContext = createContext();
const MyProvider = ({ children }) => {
	const [token, setToken] = useState(
		JSON.parse(localStorage.getItem("token"))
	);

	// const [scroll, setscroll] = useState(true);
	const [search, setsearch] = useState();

	const [nextbatch, setnextbatch] = useState(false);
	const [nextbatchorder, setnextbatchorder] = useState(false);

	const [products, setproducts] = useState([]);
	const [delverage, setdelverage] = useState([]);
	const [deliveryfee, setdeliveryfee] = useState([]);
	const [brands, setbrands] = useState([]);
	const [privacy, setprivacy] = useState([]);
	const [about, setabout] = useState([]);
	const [kioskname, setkioskname] = useState([]);
	const [kioskvericode, setkioskvericode] = useState([]);
	const [kioskbanner, setkioskbanner] = useState([]);
	const [orders, setorders] = useState([]);
	const [merchid, setmerchid] = useState([]);
	const [coverimage, setcoverimage] = useState([]);
	const [kiosklogo, setkiosklogo] = useState([]);

	const [userview, setuserview] = useState([]);
	const [category, setcategory] = useState([]);
	const [sociallinks, setsocialinks] = useState([]);

	const [kiosktheme, setkiosktheme] = useState([]);
	const [dashtheme, setdashtheme] = useState([]);
	const [catorient, setcatorient] = useState([]);

	const [adminDetails, setadminDetails] = useState(
		JSON.parse(localStorage.getItem("admindetails"))
	);
	const loader = useRef(null);
	const hh = useRef();

	const lastproduct = useRef("");

	const fetchData = async () => {
		(async () => {
			const querySnapshot = await getDocs(
				query(
					collection(db, "myproducts"),
					orderBy("createdAt"),
					limit(50)
				)
			);

			const lastVisible =
				querySnapshot.docs[querySnapshot.docs.length - 1];

			lastproduct.current = lastVisible;

			querySnapshot.forEach((doc) => {
				// setproducts((prev) => [...prev, { ...doc.data(), id: doc.id }]);
				setproducts((prev) => [
					...new Map(
						[...prev, { ...doc.data(), id: doc.id }].map((item) => [
							item.id,
							item,
						])
					).values(),
				]);
			});
		})();
	};

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData2 = async (entries) => {
		const [entry] = entries;
		// console.log(hh.current)
		if (hh.current instanceof Array && hh.current.length === 0) return;

		// console.log(entry.isIntersecting);
		if (!entry.isIntersecting) return;

		if (entry.isIntersecting) {
			setnextbatch(true);
		}
		// console.log(lastproduct.current);
		const querySnapshot = await getDocs(
			query(
				collection(db, "myproducts"),
				orderBy("createdAt"),
				startAfter(lastproduct.current || 0),
				limit(50)
			)
		);
		hh.current = querySnapshot.docs;

		querySnapshot.forEach((doc) => {
			// console.log([{ ...doc.data(), id: doc.id }]);

			setproducts((prev) => [
				...new Map(
					[...prev, { ...doc.data(), id: doc.id }].map((item) => [
						item.id,
						item,
					])
				).values(),
			]);

			if ([{ ...doc.data(), id: doc.id }]) {
				lastproduct.current = "";
			}
		});
		setnextbatch(false);

		const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
		// console.log(lastVisible);
		if (lastVisible) {
			lastproduct.current = lastVisible;
		}
	};

	const fetchData3 = async () => {
		if (hh.current instanceof Array && hh.current.length === 0) return;

		setnextbatch(true);

		const querySnapshot = await getDocs(
			query(
				collection(db, "myproducts"),
				orderBy("createdAt"),
				startAfter(lastproduct.current || 0),
				limit(50)
			)
		);

		hh.current = querySnapshot.docs;

		querySnapshot.forEach((doc) => {
			setproducts((prev) => [...prev, { ...doc.data(), id: doc.id }]);
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
			setbrands((prev) => [...prev, { ...doc.data(), brandid: doc.id }]);
		});
	};

	useEffect(() => {
		fetchBrands();
	}, []);

	const fetchPrivacy = async () => {
		const querySnapshot = await getDocs(query(collection(db, "privacy")));

		querySnapshot.forEach((doc) => {
			setprivacy((prev) => [...prev, { ...doc.data(), privid: doc.id }]);
		});
	};

	useEffect(() => {
		fetchPrivacy();
	}, []);

	const fetchAbout = async () => {
		const querySnapshot = await getDocs(query(collection(db, "about")));

		querySnapshot.forEach((doc) => {
			setabout((prev) => [...prev, { ...doc.data(), aboutid: doc.id }]);
		});
	};
	// console.log(token)
	useEffect(() => {
		fetchAbout();
	}, []);

	const fetchKioskName = async () => {
		const querySnapshot = await getDocs(query(collection(db, "kioskname")));

		querySnapshot.forEach((doc) => {
			setkioskname((prev) => [
				...prev,
				{ ...doc.data(), kioskid: doc.id },
			]);
		});
	};

	useEffect(() => {
		fetchKioskName();
	}, []);
	const fetchKioskVeriCode = async () => {
		const querySnapshot = await getDocs(
			query(collection(db, "kioskvericode"))
		);

		querySnapshot.forEach((doc) => {
			setkioskvericode((prev) => [
				...prev,
				{ ...doc.data(), verid: doc.id },
			]);
		});
	};

	useEffect(() => {
		fetchKioskVeriCode();
	}, []);

	useEffect(() => {
		if (kioskname.length !== 0) {
			localStorage.setItem("kioskname", kioskname[0].name);
		}
	}, [kioskname]);

	const fetchKioskBanner = async () => {
		const querySnapshot = await getDocs(
			query(collection(db, "kioskbanner"))
		);

		querySnapshot.forEach((doc) => {
			setkioskbanner((prev) => [
				...new Map(
					[...prev, { ...doc.data(), banid: doc.id }].map((item) => [
						item.banid,
						item,
					])
				).values(),
			]);
		});
	};

	useEffect(() => {
		fetchKioskBanner();
	}, []);

	const fetchMerch = async () => {
		const querySnapshot = await getDocs(query(collection(db, "merchid")));

		querySnapshot.forEach((doc) => {
			setmerchid((prev) => [...prev, { ...doc.data(), mid: doc.id }]);
		});
	};
	// console.log(token);
	useEffect(() => {
		fetchMerch();
	}, []);

	const fetchCover = async () => {
		const querySnapshot = await getDocs(
			query(collection(db, "kioskcover"))
		);

		querySnapshot.forEach((doc) => {
			setcoverimage((prev) => [
				...new Map(
					[...prev, { ...doc.data(), cid: doc.id }].map((item) => [
						item.cid,
						item,
					])
				).values(),
			]);
		});
	};
	// console.log(token);
	useEffect(() => {
		fetchCover();
	}, []);
	const fetchLogo = async () => {
		const querySnapshot = await getDocs(
			query(collection(db, "kiosklogo"))
		);

		querySnapshot.forEach((doc) => {
			setkiosklogo((prev) => [
				...new Map(
					[...prev, { ...doc.data(), klid: doc.id }].map((item) => [
						item.cid,
						item,
					])
				).values(),
			]);
		});
	};
	// console.log(token);
	useEffect(() => {
		fetchLogo();
	}, []);

	const fetchkioskTheme = async () => {
		const querySnapshot = await getDocs(
			query(collection(db, "kiosktheme"))
		);

		querySnapshot.forEach((doc) => {
			setkiosktheme((prev) => [
				...new Map(
					[...prev, { ...doc.data(), thid: doc.id }].map((item) => [
						item.themename,
						item,
					])
				).values(),
			]);
		});
	};

	useEffect(() => {
		fetchkioskTheme();
	}, []);

	const fetchDashTheme = async () => {
		const querySnapshot = await getDocs(query(collection(db, "dashtheme")));

		querySnapshot.forEach((doc) => {
			setdashtheme((prev) => [
				...new Map(
					[...prev, { ...doc.data(), thid: doc.id }].map((item) => [
						item.themename,
						item,
					])
				).values(),
			]);
		});
	};

	useEffect(() => {
		fetchDashTheme();
	}, []);

	const fetchCatOrient = async () => {
		const querySnapshot = await getDocs(query(collection(db, "catorient")));

		querySnapshot.forEach((doc) => {
			setcatorient((prev) => [
				...new Map(
					[...prev, { ...doc.data(), oriid: doc.id }].map((item) => [
						item.orient,
						item,
					])
				).values(),
			]);
		});
	};

	useEffect(() => {
		fetchCatOrient();
	}, []);

	const fetchUserView = async () => {
		const querySnapshot = await getDocs(query(collection(db, "userview")));

		querySnapshot.forEach((doc) => {
			// console.log(doc.data())
			setuserview((prev) => [
				...new Map(
					[...prev, { ...doc.data(), vid: doc.id }].map((item) => [
						item.vid,
						item,
					])
				).values(),
			]);
		});
	};

	useEffect(() => {
		fetchUserView();
	}, []);

	const fetchSocialLinks = async () => {
		const querySnapshot = await getDocs(query(collection(db, "sociallinks")));

		querySnapshot.forEach((doc) => {
			// console.log(doc.data())
			setsocialinks((prev) => [
				...new Map(
					[...prev, { ...doc.data(), sid: doc.id }].map((item) => [
						item.vid,
						item,
					])
				).values(),
			]);
		});
	};

	useEffect(() => {
		fetchSocialLinks();
	}, []);

	const fetchCategory = async () => {
		const querySnapshot = await getDocs(query(collection(db, "category")));

		querySnapshot.forEach((doc) => {
			// console.log(doc.data())
			setcategory((prev) => [
				...new Map(
					[...prev, { ...doc.data(), catid: doc.id }].map((item) => [
						item.catid,
						item,
					])
				).values(),
			]);
		});
	};

	useEffect(() => {
		fetchCategory();
	}, []);

	useEffect(() => {
		let ff = document.getElementsByTagName("BODY")[0];

		if (dashtheme.length !== 0) {
			ff.classList.replace(ff.className, dashtheme[0].themename);
		}
	}, [dashtheme]);
	//persisting with dashboardtheme
	useEffect(() => {
		let storedDetails = localStorage.getItem("theme-mode");
		if (storedDetails) {
			setdashtheme(JSON.parse(storedDetails));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("theme-mode", JSON.stringify(dashtheme));
	}, [dashtheme]);

	//persisting with kiosk-theme
	useEffect(() => {
		let storedDetails = localStorage.getItem("kiosk-theme-mode");
		if (storedDetails) {
			setkiosktheme(JSON.parse(storedDetails));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("kiosk-theme-mode", JSON.stringify(kiosktheme));
	}, [kiosktheme]);

	useEffect(() => {
		let storedDetails = localStorage.getItem("cart-orient");
		if (storedDetails) {
			setcatorient(JSON.parse(storedDetails));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("cart-orient", JSON.stringify(catorient));
	}, [catorient]);


	useEffect(() => {
		let storedDetails = localStorage.getItem("kiosk-logo");
		if (storedDetails) {
			setkiosklogo(JSON.parse(storedDetails));
		}
	}, []);
	
	useEffect(() => {
		localStorage.setItem("kiosk-logo", JSON.stringify(kiosklogo));
	}, [kiosklogo]);
	


	useEffect(() => {
		let ff = document.getElementsByTagName("BODY")[0];

		if (ff.className === "greenish-light") {
			let meta = document.createElement("meta");
			meta.name = "theme-color";
			meta.content = "#042005";
			document.head.appendChild(meta);
			return;
		}
		if (ff.className === "orangereddish-light") {
			let meta = document.createElement("meta");
			meta.name = "theme-color";
			meta.content = "#201904";
			document.head.appendChild(meta);
			return;
		}

		if (ff.className === "brownish-light") {
			let meta = document.createElement("meta");
			meta.name = "theme-color";
			meta.content = "#201104";
			document.head.appendChild(meta);
			return;
		}
		if (ff.className === "purple-light") {
			let meta = document.createElement("meta");
			meta.name = "theme-color";
			meta.content = "#1c0420";
			document.head.appendChild(meta);
			return;
		}

		if (ff.className === "blueish-light") {
			let meta = document.createElement("meta");
			meta.name = "theme-color";
			meta.content = "#040b2";
			document.head.appendChild(meta);
			return;
		}

		if (ff.className === "blueishgreen-light") {
			let meta = document.createElement("meta");
			meta.name = "theme-color";
			meta.content = "#041e20";
			document.head.appendChild(meta);
			return;
		}

		if (ff.className === "reddish-light") {
			let meta = document.createElement("meta");
			meta.name = "theme-color";
			meta.content = "#200404";
			document.head.appendChild(meta);
			return;
		}

		if (ff.className === "greenishblue-dark") {
			let meta = document.createElement("meta");
			meta.name = "theme-color";
			meta.content = "#162222";
			document.head.appendChild(meta);
			return;
		}
		if (ff.className === "blueish-dark") {
			let meta = document.createElement("meta");
			meta.name = "theme-color";
			meta.content = "#161822";
			document.head.appendChild(meta);
			return;
		}
		if (ff.className === "greenish-dark") {
			let meta = document.createElement("meta");
			meta.name = "theme-color";
			meta.content = "#172216";
			document.head.appendChild(meta);
			return;
		}
		if (ff.className === "reddish-dark") {
			let meta = document.createElement("meta");
			meta.name = "theme-color";
			meta.content = "#221616";
			document.head.appendChild(meta);
			return;
		}

		if (ff.className === "yellowish-dark") {
			let meta = document.createElement("meta");
			meta.name = "theme-color";
			meta.content = "#17150d";
			document.head.appendChild(meta);
			return;
		}
		if (ff.className === "purple") {
			let meta = document.createElement("meta");
			meta.name = "theme-color";
			meta.content = "#201622";
			document.head.appendChild(meta);
			return;
		}
	}, [dashtheme]);
	return (
		<MyContext.Provider
			value={{
				fetchCatOrient,
				kiosktheme,
				setkiosktheme,
				dashtheme,
				setdashtheme,
				fetchkioskTheme,
				fetchDashTheme,
				search,
				setproducts,
				products,
				setsearch,
				nextbatch,
				loader,
				token,
				setToken,
				fetchData,
				fetchData3,
				delverage,
				setdelverage,
				deliveryfee,
				setdeliveryfee,
				brands,
				setbrands,
				privacy,
				setprivacy,
				about,
				setabout,
				setkioskname,
				kioskname,
				kioskbanner,
				setkioskbanner,
				orders,
				setorders,
				merchid,
				setmerchid,
				adminDetails,
				setadminDetails,
				fetchData2,
				coverimage,
				setcoverimage,
				kiosklogo,
				setkiosklogo,
				fetchCover,
				fetchLogo,
				fetchKioskBanner,
				// loaderOrder,
				nextbatchorder,

				catorient,
				setcatorient,
				setnextbatchorder,
				kioskvericode,
				setkioskvericode,
				userview,
				setuserview,
				category,
				setcategory,
				fetchCategory,
				sociallinks,
				setsocialinks,fetchSocialLinks
			}}>
			{children}
		</MyContext.Provider>
	);
};

export default MyProvider;
