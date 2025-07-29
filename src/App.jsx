import QRGenerator from "./components/QRGenerator";
import "./App.css";

function App() {
	return (
		<div className="app">
			<main className="container">
				<h1 className="title">Free QR Code Generator</h1>
				<p className="description">Simple QR generator for free</p>
				<br />
				<QRGenerator />
			</main>
		</div>
	);
}

export default App;
