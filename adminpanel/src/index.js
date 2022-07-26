import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
// console.log(localStorage.getItem("theme-mode"));

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

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


