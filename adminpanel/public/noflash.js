(() => {
	let ff = document.getElementsByTagName("BODY")[0];

	if (
		JSON.parse(localStorage.getItem("theme-mode")) &&
		JSON.parse(localStorage.getItem("theme-mode")).length !== 0
	) {
		ff.classList.replace(
			ff.className,
			JSON.parse(localStorage.getItem("theme-mode"))[0].themename
		);
	}
})();
