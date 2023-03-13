import { useState } from "react";
import fetchNoCors from "fetch-no-cors"


function App() {
	const [wallet,setWallet] = useState('');
	const [step,setStep] = useState(1);
	const [code,setCode] = useState('');
	const [status,setStatus] = useState('');
	const [loading,setLoading] = useState(false);
	const checkWallet = () => {
		console.log(wallet);
		setStep(2);
		setCode('test-'+Math.random());
	}

	const checkCode = () => {
		setLoading(true);
		fetchNoCors("https://opensea.io/"+wallet)
		.then((response) => response.text())
		.then((data) => {
			if(data.indexOf(code)>-1){
				setStatus('Onaylandı');
			}else{
				setStatus('Onaylanmadı');
			}
			setLoading(false);
		});
	}

	return (
		<div style={{padding:50}}>
			v2
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
					{loading ? <h2>Kontrol ediliyor ...</h2> : <h2>{status}</h2>}
					<button onClick={checkCode}>Onayla</button>
				</>
			: null}
			
		</div>
	);
}

export default App;
