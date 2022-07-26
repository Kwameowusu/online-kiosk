import React from "react";
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import db from "../components/firebase";
import EachProduct from "../components/product/EachProduct";

const aproduct = ({ data, kioskName, kioskCover, kioskTheme,Kioskvericode,KioskSocialLinks }) => {
	// console.log(data);
	return (
		<>
			<EachProduct
				data={data}
				kioskName={kioskName}
				kioskCover={kioskCover}
				kioskTheme={kioskTheme}
				Kioskvericode={Kioskvericode}
				KioskSocialLinks={KioskSocialLinks}

			/>
		</>
	);
};

export async function getStaticPaths() {
	const products = [];
	const querySnapshot = await getDocs(query(collection(db, "myproducts")));

	querySnapshot.forEach((doc) => {
		products.push({ ...doc.data(), id: doc.id });
	});

	// Get the paths we want to pre-render based on posts
	const paths = products.map((pro) => ({
		params: { aproduct: ["aproduct", pro.name, pro.id] },
	}));
	// console.log(paths);
	// We'll pre-render only these paths at build time.
	// { fallback: blocking } will server-render pages
	// on-demand if the path doesn't exist.
	return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
	// console.log(params);

	const docRef = doc(db, "myproducts", `${params.aproduct[2]}`);
	const docSnap = await getDoc(docRef);
	const data = { ...docSnap.data(), id: docSnap.id };

	let kioskName = [];
	const querySnapshot2 = await getDocs(query(collection(db, "kioskname")));

	querySnapshot2.forEach((doc) => {
		kioskName.push({ ...doc.data(), kioskid: doc.id });
	});

	const kioskCover = [];
	const querySnapshot4 = await getDocs(query(collection(db, "kioskcover")));

	querySnapshot4.forEach((doc) => {
		kioskCover.push({ ...doc.data(), cid: doc.id });
	});
	const kioskTheme = [];
	const querySnapshot5 = await getDocs(query(collection(db, "kiosktheme")));

	querySnapshot5.forEach((doc) => {
		kioskTheme.push({ ...doc.data(), thid: doc.id });
	});

	const Kioskvericode = [];
	const querySnapshot6= await getDocs(query(collection(db, "kioskvericode")));

	querySnapshot6.forEach((doc) => {
		Kioskvericode.push({ ...doc.data(), verid: doc.id });
	});



	const KioskSocialLinks = [];
	const querySnapshot7= await getDocs(query(collection(db, "sociallinks")));

	querySnapshot7.forEach((doc) => {
		KioskSocialLinks.push({ ...doc.data(), sid: doc.id });
	});
	return {
		props: {
			data: JSON.parse(JSON.stringify(data)),
			kioskName: JSON.parse(JSON.stringify(kioskName)),
			kioskTheme: JSON.parse(JSON.stringify(kioskTheme)),
			kioskCover: JSON.parse(JSON.stringify(kioskCover)),
			Kioskvericode: JSON.parse(JSON.stringify(Kioskvericode)),
			KioskSocialLinks: JSON.parse(JSON.stringify(KioskSocialLinks)),

		},
		revalidate: 60,
	};
}

export default aproduct;
