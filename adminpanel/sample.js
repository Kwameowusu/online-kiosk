const dividfunc = (a, b) => {
	return (a + b) / 2;
};
const eqnfunc = (x) => {
	return Math.pow(x, 3) - x - 1;
};

let r = 0

const mainfunc = (a, b) => {
	 r++
	const l = eqnfunc(a);
	const divVal = dividfunc(a, b);
	const midp = eqnfunc(divVal);
	console.log(midp);
	if (r === 3) {
		return;
	}
	if (midp > 0) {
		mainfunc(l, midp);
	}
};

mainfunc(3, 4);

// const mainfunc = (a, b) => {
// 	const divVal = dividfunc(a, b);
// 	const midp = eqnfunc(divVal);
// 	const l = eqnfunc(a);
// 	const v = midp * l;
// 	if (v === 0 || (v < 1 && v > 0 && v < 0.001)) {
// 		console.log(v);
// 		return;
// 	}
// 	// console.log(v)

// 	if (v > 0) {
// 		const r = eqnfunc(b);
// 		const nm = eqnfunc(v);
// 		mainfunc(nm, r);
// 	}

// 	if (v < 0) {
// 		const l = eqnfunc(a);
// 		const nm = eqnfunc(v);
// 		mainfunc(l, nm);
// 	}
// };

// mainfunc(1, 2);
