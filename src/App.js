import { useState } from "react";


function App() {
	const [wallet,setWallet] = useState('');
	const [step,setStep] = useState(1);
	const [code,setCode] = useState('');
	const [status,setStatus] = useState('');
	const checkWallet = () => {
		console.log(wallet);
		setStep(2);
		setCode('test-'+Math.random());
	}

	const checkCode = () => {
		fetch("https://opensea.io/"+wallet)
		.then((response) => response.text())
		.then((data) => {
			if(data.indexOf(code)>-1){
				setStatus('Onaylandı');
			}else{
				setStatus('Onaylanmadı');
			}
		});
	}

	return (
		<div style={{padding:50}}>
			{step == 1 ?
				<>
					<input type="text"
						value={wallet}
						onChange={(event) => {
							setWallet(event.target.value);
						}}
					></input>
					<button onClick={checkWallet}>Cüzdan Gir</button>
				</>
			: null}
			{step == 2 ?
				<>
					<h1>{code}</h1>
					<h2>{status}</h2>
					<button onClick={checkCode}>Onayla</button>
				</>
			: null}
			
		</div>
	);
}

export default App;
