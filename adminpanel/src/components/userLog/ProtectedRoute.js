import { useContext } from "react";
import { MyContext } from "../../contextapi/MyProvider";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = () => {
	const auth = getAuth();
	const { token, setToken } = useContext(MyContext);
	const location = useLocation();
	onAuthStateChanged(auth, (currentUser) => {
		setToken(currentUser);
	});
	if (!token) {
		return <Navigate replace to="/login" state={{ from: location }} />;
	}
	return <Outlet />;
};

export default ProtectedRoute;
