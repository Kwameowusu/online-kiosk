import MyProvider from "../components/contextapi/MyProvider";
import "../styles/styles.css";

function MyApp({ Component, pageProps }) {


	return (
		<>
			<MyProvider>
				<Component {...pageProps} />
			</MyProvider>
		</>
	);
}

export default MyApp;
