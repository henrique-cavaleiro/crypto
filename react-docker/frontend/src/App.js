// App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import CryptoChart from "./components/CryptoChart";
import Portfolio from "./components/Portfolio";
import Examen from "./components/examen";

function App() {
    const [prices, setPrices] = useState({ BTC: null, ETH: null });
    const [refreshRate, setRefreshRate] = useState(1000); // default 1s
    const [currency, setCurrency] = useState("EUR");
    const [currencyIcon, setIcon] = useState("€");


    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch(`http://192.168.5.186:3500/api/prices?currency=${currency}`);
                const data = await response.json();
                setPrices(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
    
        fetchPrices(); // initial fetch
        const interval = setInterval(fetchPrices, refreshRate); // use selected rate
    
        return () => clearInterval(interval);
    }, [refreshRate, currency]); // re-run effect when rate changes
    

    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/portfolio">Portfolio</Link></li>
                    <li><Link to="/examen">Examen</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={
                    <div>
                        <h1>Crypto Prices </h1>
                        <label>
                        Currency:
                        <select 
                            value={currency}
                            othervalue={currencyIcon}
                            onChange={(e) => {
                                setCurrency(e.target.value);
                                setIcon(e.target.options[e.target.selectedIndex].getAttribute("othervalue"))
                            }}
                        >
                            <option value="EUR" othervalue="€" >€ EUR</option>
                            <option value="USD" othervalue="$">$ USD</option>
                        </select>
                        </label>

                        <p>Bitcoin (BTC): {prices.BTC ? `${currencyIcon}${prices.BTC}` : "Loading..."}</p>
                        <p>Ethereum (ETH): {prices.ETH ? `${currencyIcon}${prices.ETH}` : "Loading..."}</p>
                        <label>
                        Update Interval:
                        <select value={refreshRate} onChange={e => setRefreshRate(Number(e.target.value))}>
                            <option value={1000}>1s</option>
                            <option value={5000}>5s</option>
                            <option value={10000}>10s</option>
                            <option value={100000}>100s</option>
                        </select>
                        </label>
                        <Examen />
                        <CryptoChart prices={prices} currency={currency} refreshRate={refreshRate} />
                    </div>
                } />
                <Route path="/portfolio" element={<Portfolio prices={prices} />} />
            </Routes>
        </Router>
    );
}

export default App;








// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
