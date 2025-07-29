import { useMemo } from "react";
import Details from "./components/Details";
import QRGenerator from "./components/QRGenerator";
import "./App.css";

function App() {
	const randomColor = useMemo(() => {
		const hue = Math.floor(Math.random() * 360);
		return `hsl(${hue}, 70%, 50%)`;
	}, []);

	return (
		<div className="app">
			<main className="container">
				<h1 className="title">Free QR Code Generator</h1>
				<svg
					className="qr-icon"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke={randomColor}
					strokeWidth="2"
				>
					<title>QR Code</title>
					<rect x="3" y="3" width="18" height="18" rx="2" />
					<rect x="7" y="7" width="3" height="3" />
					<rect x="14" y="7" width="3" height="3" />
					<rect x="7" y="14" width="3" height="3" />
					<rect x="14" y="14" width="3" height="3" />
					<rect x="10" y="10" width="4" height="4" />
				</svg>
				<p className="description">Simple Open Source QR generator for free</p>
				<br />
				<QRGenerator />
				<Details />
			</main>
		</div>
	);
}

export default App;
