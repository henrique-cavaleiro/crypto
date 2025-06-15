// cryptoAPI.js

export async function fetchCryptoPrices(currency = "USD") {
    try {
        const btcUrl = `https://api.coinbase.com/v2/prices/BTC-${currency}/spot`;
        const ethUrl = `https://api.coinbase.com/v2/prices/ETH-${currency}/spot`;

        const [btcData, ethData] = await Promise.all([
            fetch(btcUrl).then(res => res.json()),
            fetch(ethUrl).then(res => res.json())
        ]);

        return {
            BTC: btcData.data.amount,
            ETH: ethData.data.amount
        };
    } catch (error) {
        console.error("Error fetching prices:", error);
        return { BTC: null, ETH: null };
    }
}
