import React, { useEffect, useRef, useState,createContext } from "react";

import {
	getDatabase,
	ref,
	onValue,
} from "firebase/database";

export const MyOrderContext = createContext();
const OrderProvider = ({ children }) => {
	const [orders, setorders] = useState([]);
	const [nextbatchorder, setnextbatchorder] = useState(null);
	const loaderOrder = useRef(null);


	useEffect(() => {
		const db = getDatabase();

		const starCountRef = ref(db, "/orderdetails");
		setnextbatchorder(true);

		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
            if (data === null) {
			setnextbatchorder(false);
            return
        }
			Object.values(data).forEach((orderdata, index) => {
				setorders((prev) => [
					...new Map(
						[
							...prev,
							{ ...orderdata, oid: Object.keys(data)[index] },
						].map((item) => [item.code, item])
					).values(),
				]);
			});
		
			setnextbatchorder(false);
		});
	
	}, []);

	return (
		<MyOrderContext.Provider
			value={{
				orders,
				setorders,
				loaderOrder,
				nextbatchorder,
			}}>
			{children}
		</MyOrderContext.Provider>
	);
};

export default OrderProvider;

