import React, { useState, useEffect, useContext } from "react";
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";
import { MyContext } from "../../contextapi/MyProvider";
import { useNavigate, Link } from "react-router-dom";

import KioskCluster from "../common/KioskCluster";
import { ErrorPlate } from "../common/ErrorPlate";
import { Eye, EyeClose } from "../common/icons/Icons";

const Login = () => {
	const auth = getAuth();
	const [openeye, setopeneye] = useState(false);
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");

	const [ErrMessage, setErrMessage] = useState("");
	const [errTime, setErrTime] = useState(null);
	const [loginsucc, setloginsucc] = useState(false);
	// const [succTime, setSuccTime] = useState(false);
	const navigate = useNavigate();

	const { token, setToken } = useContext(MyContext);

	useEffect(() => {
		if (token) {
			setloginsucc(false);
			navigate("/");
		}
	}, [token, navigate]);
	onAuthStateChanged(auth, (currentUser) => {
		setToken(currentUser);
		// console.log(currentUser)
	});
	const SubmitData = async (e) => {
		e.preventDefault();
		setloginsucc(true);

		if (auth) {
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					console.log(userCredential);
					localStorage.setItem(
						"token",
						JSON.stringify(userCredential.user)
					);

					setToken(userCredential.user);
					// setSuccTime(true);
					navigate("/");
				})
				.catch((error) => {
					// const errorCode = error.code;
					const errorMessage = error.message;
					console.log(errorMessage);

					setloginsucc(false);
					setErrMessage("Oops :) invalid credentials");
					setErrTime(true);

					const timer = setTimeout(() => {
						setErrTime(false);
					}, 5000);
					return () => clearTimeout(timer);
				});
		}
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					height: "100vh",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<ErrorPlate
					promptClassName="errorplate-container"
					EnterAnimate="BounceIn"
					ExitAnimate="BounceOut"
					detailsError={errTime}
					timeOut="750"
					ErrMessage={ErrMessage}
				/>
				<div className="login-container">
					<div className="login-card-wrapper">
						<div className="login-card-header">
							<p>Granddies admin panel</p>
						</div>
						<div className="login-card-signIn-header">
							<p>SIGN IN</p>
						</div>
						<div className="error-head"></div>
						<form
							onSubmit={SubmitData}
							className="login-form-wrapper">
							<div>
								<input
									onChange={(e) => setemail(e.target.value)}
									type="email"
									name="email"
									value={email}
									id="email"
									required
									placeholder="Enter email address"
									autoComplete="false"
									autoCorrect="false"
								/>
							</div>
							<div>
								<input
									onChange={(e) =>
										setpassword(e.target.value)
									}
									type={!openeye ? "password" : "text"}
									name="password"
									id="password"
									spellCheck="false"
									required
									value={password}
									placeholder="Enter password"
									autoComplete="false"
								/>
								{openeye ? (
									<i className="p1" onClick={() => setopeneye(!openeye)}>
										<Eye iwidth="18" iheight="18" />
									</i>
								) : (
									<i className="p2" onClick={() => setopeneye(!openeye)}>
										<EyeClose iwidth="18" iheight="18" />
									</i>
								)}
							</div>

							<span className="login-form-submit-wrapper">
								<button type="submit">
									{loginsucc === false ? (
										<p className="p1">Login</p>
									) : (
										<p className="p2 ">Signing in...</p>
									)}
								</button>
							</span>
						</form>
					</div>
				</div>
				<div style={{ marginBottom: "0px" }} className="footer-wrapper">
					<div className="footer-container">
						<div className="footer-relevant-links">
							<Link to="/">
								<p>Kiosk Cluster</p>
							</Link>
							<Link to="/">
								<p>Terms</p>
							</Link>
							<Link to="/">
								<p>About</p>
							</Link>
						</div>
						<div className="footer-kioskcluster-logo">
							<span>
								<KioskCluster />
							</span>
							<span className="footer-kioskcluster-name">
								<p>Kiosk Cluster</p>
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;

// document
// 	.querySelector(".errorplate-container")
// 	.classList.remove("BounceOut");
// document.querySelector(
// 	".errorplate-wrapper"
// ).style.display = "flex";
// document
// 	.querySelector(".errorplate-container")
// 	.classList.add("BounceIn");

// if (error) {
// 	const timer = setTimeout(() => {
// 		const hi = (callback) => {
// 			setTimeout(() => {
// 				if (ref.current.style.display === "flex") {
// 					document
// 						.querySelector(
// 							".errorplate-container"
// 						)
// 						.classList.remove("BounceIn");
// 					document
// 						.querySelector(
// 							".errorplate-container"
// 						)
// 						.classList.add("BounceOut");
// 				}
// 				callback();
// 			}, 750);
// 		};

// 		const hello = () => {
// 			setTimeout(() => {
// 				document.querySelector(
// 					".errorplate-wrapper"
// 				).style.display = "none";
// 				setDetailsError("");
// 			}, 750);
// 		};
// 		hi(hello);
// 	}, 7000);

// 	return () => clearTimeout(timer);
// }
