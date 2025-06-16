// Portfolio.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Portfolio = () => {
  // Example portfolio state (can later be stored in localStorage or a database)
  const [portfolio, setPortfolio] = useState([
    { symbol: "BTC", amount: 0.1 },
    { symbol: "ETH", amount: 2 },
    { symbol: "DOGE", amount: 0.5 },  // examen
    
  ]);

  const [prices, setPrices] = useState({ BTC: 0, ETH: 0, DOGE: 0 });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get("http://192.168.5.186:3500/api/prices");
        setPrices(response.data);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalValue = portfolio.reduce((acc, coin) => {
    return acc + (prices[coin.symbol] || 0) * coin.amount;
  }, 0);

  return (
    <div>
      <h2>Portfolio</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Coin</th>
            <th>Amount</th>
            <th>Price (€)</th>
            <th>Value (€)</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((coin) => (
            <tr key={coin.symbol}>
              <td>{coin.symbol}</td>
              <td>{coin.amount}</td>
              <td>€{prices[coin.symbol] || "Loading..."}</td>
              <td>€{((prices[coin.symbol] || 0) * coin.amount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Portfolio Value: €{totalValue.toFixed(2)}</h3>
    </div>
  );
};

export default Portfolio;
