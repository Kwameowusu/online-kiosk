import Head from "next/head";
import MyHome from "../components/home/MyHome";
import { collection, orderBy, limit, query, getDocs } from "firebase/firestore";
import db from "../components/firebase";
// import absoluteUrl from 'next-absolute-url'
export default function Home({
	allproducts,
	kioskName,
	kioskBanner,
	kioskCover,
	kioskAbout,
	kioskTheme,
	CatOrientation,
	Kioskvericode, productCategory ,KioskSocialLinks
}) {
    
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,height=device-height"
				/>
			</Head>
			<MyHome
				allproducts={allproducts}
				kioskName={kioskName}
				kioskBanner={kioskBanner}
				kioskCover={kioskCover}
				kioskAbout={kioskAbout}
				kioskTheme={kioskTheme}
				CatOrientation={CatOrientation}
				Kioskvericode={Kioskvericode}
				productCategory={productCategory}
				KioskSocialLinks={KioskSocialLinks}
				
			/>
		</>
	);
}

export async function getStaticProps() {
	const allproducts = [];
	const querySnapshot = await getDocs(
		query(collection(db, "myproducts"), orderBy("createdAt"), limit(10))
	);

	querySnapshot.forEach((doc) => {
		allproducts.push({ ...doc.data(), id: doc.id });
	});

	const kioskName = [];
	const querySnapshot2 = await getDocs(query(collection(db, "kioskname")));

	querySnapshot2.forEach((doc) => {
		kioskName.push({ ...doc.data(), kioskid: doc.id });
	});

	const kioskBanner = [];
	const querySnapshot3 = await getDocs(query(collection(db, "kioskbanner")));

	querySnapshot3.forEach((doc) => {
		kioskBanner.push({ ...doc.data(), banid: doc.id });
	});

	const kioskCover = [];
	const querySnapshot4 = await getDocs(query(collection(db, "kioskcover")));

	querySnapshot4.forEach((doc) => {
		kioskCover.push({ ...doc.data(), cid: doc.id });
	});

	const kioskAbout = [];
	const querySnapshot5 = await getDocs(query(collection(db, "about")));

	querySnapshot5.forEach((doc) => {
		kioskAbout.push({ ...doc.data(), abid: doc.id });
	});

	const kioskTheme = [];
	const querySnapshot6 = await getDocs(query(collection(db, "kiosktheme")));

	querySnapshot6.forEach((doc) => {
		kioskTheme.push({ ...doc.data(), thid: doc.id });
	});
	const CatOrientation = [];
	const querySnapshot8 = await getDocs(query(collection(db, "catorient")));

	querySnapshot8.forEach((doc) => {
		CatOrientation.push({ ...doc.data(), oriid: doc.id });
	});

	const Kioskvericode = [];
	const querySnapshot9 = await getDocs(
		query(collection(db, "kioskvericode"))
	);

	querySnapshot9.forEach((doc) => {
		Kioskvericode.push({ ...doc.data(), verid: doc.id });
	});

	const productCategory = [];
	const querySnapshot10 = await getDocs(query(collection(db, "category")));

	querySnapshot10.forEach((doc) => {
		
		productCategory.push({ ...doc.data(), catid: doc.id });
	});

	const KioskSocialLinks = [];
	const querySnapshot11= await getDocs(query(collection(db, "sociallinks")));

	querySnapshot11.forEach((doc) => {
		KioskSocialLinks.push({ ...doc.data(), sid: doc.id });
	});

	return {
		props: {
			allproducts: JSON.parse(JSON.stringify(allproducts)),
			kioskName: JSON.parse(JSON.stringify(kioskName)),
			kioskBanner: JSON.parse(JSON.stringify(kioskBanner)),
			kioskCover: JSON.parse(JSON.stringify(kioskCover)),
			kioskAbout: JSON.parse(JSON.stringify(kioskAbout)),
			kioskTheme: JSON.parse(JSON.stringify(kioskTheme)),
			CatOrientation: JSON.parse(JSON.stringify(CatOrientation)),
			Kioskvericode: JSON.parse(JSON.stringify(Kioskvericode)),
			productCategory: JSON.parse(JSON.stringify(productCategory)),
			KioskSocialLinks: JSON.parse(JSON.stringify(KioskSocialLinks)),

		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 60 seconds
		revalidate: 60, // In seconds
	};
}
