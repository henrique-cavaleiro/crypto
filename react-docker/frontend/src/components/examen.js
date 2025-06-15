// examen.js
import { useEffect, useState } from 'react';

function Examen() {
  const [message, setMessage] = useState('');
  const [btcPrice, setBtcPrice] = useState(null);

  useEffect(() => {
    // Haal "Hello from backend" op
    fetch('/api/hello')
      .then(res => res.text())
      .then(text => setMessage(text));

    // Haal BTC-prijs op en herhaal 
    const fetchBtcPrice = () => {
      fetch('/api/btc')
        .then(res => res.json())
        .then(data => setBtcPrice(data.price));
    };

    fetchBtcPrice();
    const interval = setInterval(fetchBtcPrice, 1000); // elke 1 seconden

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>examen</h1>
      <p><strong>hello World:</strong> {message}</p>
      <p><strong>Bitcoin prijs (USD):</strong> {btcPrice ? `$${btcPrice}` : 'Loading...'}</p>
    </div>
  );
}

export default Examen;



