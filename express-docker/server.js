// server.js
import express from 'express';
import cors from 'cors';
import { fetchCryptoPrices } from './src/cryptoAPI.js';
import pool from './src/db.js'; // Import PostgreSQL connection

const app = express();
const PORT = process.env.PORT || 3500;

// Enable CORS for React only
app.use(cors({ origin: "http://192.168.5.138:3000" }));

// Root route
app.get("/", (req, res) => {
    res.send("Hello, Docker!");
});

// Hello API route
app.get("/api/hello", (req, res) => {
    res.send("Hello, World!");
});

// Define the API route for prices and store in PostgreSQL
app.get("/api/prices", async (req, res) => {
    try {
        const currency = req.query.currency || "EUR";
        const prices = await fetchCryptoPrices(currency);

        // Ensure lookup values exist
        await pool.query(
            `INSERT INTO symbols (code) VALUES ($1), ($2), ($3)  ON CONFLICT DO NOTHING`,
            ['BTC', 'ETH', 'DOGE']
        );
        await pool.query(
            `INSERT INTO currencies (code) VALUES ($1) ON CONFLICT DO NOTHING`,
            [currency]
        );

        // Insert prices into new table
        await pool.query(`
            INSERT INTO crypto_prices (symbol_code, currency_code, price, timestamp)
            VALUES 
                ('BTC', $1, $2, NOW()),
                ('ETH', $1, $3, NOW()),
                ('DOGE', $1, $4, NOW())
        `, [currency, prices.BTC, prices.ETH, prices.DOGE]);

        res.json(prices);
    } catch (error) {
        console.error("Error storing prices:", error);
        res.status(500).json({ error: "Failed to fetch or store prices" });
    }
});


// Fetch historical data from PostgreSQL
app.get("/api/history", async (req, res) => {
    const currency = req.query.currency || "EUR";
    try {
        const { rows } = await pool.query(`
            SELECT symbol_code AS symbol, price, timestamp
            FROM crypto_prices
            WHERE currency_code = $1
            ORDER BY timestamp DESC
            LIMIT 90
        `, [currency]);

        res.json(rows);
    } catch (err) {
        console.error("History fetch error:", err);
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

// examen
app.get("/api/btc", async (req, res) => {
    try {
        const response = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot');
        const data = await response.json();
        res.json({ price: data.data.amount});


    } catch (error) {
        console.error("Error storing prices:", error);
        res.status(500).json({ error: "Failed to fetch or store prices" });
    }
});


// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
