import React from "react";
import "./App.css";
import "./animate.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyProvider from "./contextapi/MyProvider";
import ProtectedRoute from "./components/userLog/ProtectedRoute";
import Product from "./components/products/Product";
import Login from "./components/userLog/Login";
import Order from "./components/order/Order";
import Settings from "./components/settings/Settings";
import DeliverCoverage from "./components/settings/eachsetting/deliverycoverage/DeliverCoverage";
import DeliveryFees from "./components/settings/eachsetting/DeliveryFees";
import Brands from "./components/settings/eachsetting/Brands";
import Privacy from "./components/settings/eachsetting/Privacy";
import About from "./components/settings/eachsetting/About";
import EachLocation from "./components/settings/eachsetting/deliverycoverage/EachLocation";
import SignUp from "./components/settings/eachsetting/SignUp";
import AddProduct from "./components/products/addproduct/AddProduct";
import DisplayProduct from "./components/products/displayproduct/DisplayProduct";
import KioskBanner from "./components/settings/eachsetting/Banner.js/KioskBanner";
import Appearance from "./components/settings/eachsetting/appearance/Appearance";
import KioskInsight from "./components/insight/KioskInsight";
import OrderProvider from "./contextapi/OrderProvider";

function App() {
	return (
		<>
			<MyProvider>
				<OrderProvider>
					<BrowserRouter>
						<Routes>
							<Route element={<ProtectedRoute />}>
								<Route path="/" element={<KioskInsight />} />
								<Route
									path="/displayproduct"
									element={<Product />}>
									<Route
										path=""
										element={<DisplayProduct />}
									/>
									<Route
										path="addproduct"
										element={<AddProduct />}
									/>
								</Route>
								<Route path="/order" element={<Order />} />
								<Route path="/settings" element={<Settings />}>
									<Route path="" element={<Appearance />} />
									<Route
										path="deliverage"
										element={<DeliverCoverage />}>
										<Route
											path=":id"
											element={<EachLocation />}
										/>
									</Route>
									<Route
										path="deliveryfees"
										element={<DeliveryFees />}
									/>
									<Route
										path="uploadbanner"
										element={<KioskBanner />}
									/>
									<Route path="brands" element={<Brands />} />
									<Route
										path="privacy"
										element={<Privacy />}
									/>
									<Route path="about" element={<About />} />

									<Route
										path="updatelogins"
										element={<SignUp />}
									/>
								</Route>
							</Route>
							<Route Index path="/login" element={<Login />} />
						</Routes>
					</BrowserRouter>
				</OrderProvider>
			</MyProvider>
		</>
	);
}

export default App;
