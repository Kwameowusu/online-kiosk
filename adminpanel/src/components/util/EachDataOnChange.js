import { useState } from "react";

export const EachDataOnChange = () => {
	const [name, setname] = useState("");
	const [price, setprice] = useState("");
	const [discount, setdiscount] = useState("");
	const [stock, setstock] = useState("In stock");
	const [stocknumber, setstocknumber] = useState("");
	const [description, setdescription] = useState("");
	const [picksize, setpicksize] = useState([]);
	const [pickcolor, setpickcolor] = useState([]);

	const dataOnChange = (e, type) => {
		// console.log(type)
		// if (type === "stock") {
		// 	console.log(e.target.id);

		// }
		switch (type) {
			case "name":
				setname(e.target.value);
				break;
			case "price":
				setprice(e.target.value);

				break;
			case "discount":
				setdiscount(e.target.value);

				break;
			case "stock":
				setstock(e.target.id);

				break;
			case "stocknumber":
				setstocknumber(e.target.value);

				break;
			case "description":
				setdescription(e.target.value);

				break;
			default:
		}
	};
	return [
		dataOnChange,
		name,
		price,
		discount,
		stock,
		stocknumber,
		description,
		pickcolor,
		picksize,
		setdiscount,
		setname,
		setprice,
		setstock,
		setstocknumber,
		setdescription,
		setpickcolor,
		setpicksize,
	];
};
