
export const AnimateTransitionGroup = (anidata, setanidata, setadata) => {
	const getanimate = (adata) => {
		setanidata((p) => [...p, adata]);
		if (setadata instanceof Function) setadata("");
	};

	const outanimate = (id, aninameout, timeout) => {
		const rr = anidata.map((h) => {
			if (h.id === id) {
				h.animationName = aninameout;
			}
			return h;
		});
		setanidata(rr);
		setTimeout(() => {
			const pp = anidata.filter((p) => p.id !== id);
			setanidata(pp);
		}, Number(timeout) * 0.75);
	};
	const clearoutanimate = ( aninameout, timeout) => {
		const rr = anidata.map((h) => {
			h.animationName = aninameout;

			return h;
		});
		setanidata(rr);
		setTimeout(() => {
			setanidata([]);
		}, Number(timeout) * 0.75);
	};

	return [getanimate, outanimate, clearoutanimate];
};
