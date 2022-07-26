/* eslint-disable @next/next/no-document-import-in-page */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
      
		return (
			<Html lang="en">
				<Head>
					<meta charSet="utf-8" />
					<meta name="robots" content="index, follow" />
					<meta name="googlebot" content="index,follow"/>
					{/* <meta name="theme-color" content="" /> */}
				

					<link rel="manifest" href="/manifest.json" />

					<link
						rel="shortcut icon"
						href="/favicon.ico"
						type="image/x-icon"
					/>
					<link rel="apple-touch-icon" href="/logo192.png" />
					{/* <script src="https://www.paypal.com/sdk/js?client-id=AUUfR9lIbZPoDdDD5rwCe1D_ekfCsnAL5-rnFy0Zjc_qah80jHEUfwUtd5WqvUdOw_sCnMLWqd1PWao-&currency=USD"  ></script> */}
				</Head>
				<body className="l">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
