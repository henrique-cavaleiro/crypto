// cryptoAPI.js

export async function fetchCryptoPrices(currency = "USD") {
    try {
        const btcUrl = `https://api.coinbase.com/v2/prices/BTC-${currency}/spot`;
        const ethUrl = `https://api.coinbase.com/v2/prices/ETH-${currency}/spot`;
        const dogeUrl = `https://api.coinbase.com/v2/prices/doge-${currency}/spot`;
        const [btcData, ethData, dogeData] = await Promise.all([
            fetch(btcUrl).then(res => res.json()),
            fetch(ethUrl).then(res => res.json()),
            fetch(dogeUrl).then(res => res.json())
            
        ]);

        return {
            BTC: btcData.data.amount,
            ETH: ethData.data.amount,
            DOGE: dogeData.data.amount

        };
    } catch (error) {
        console.error("Error fetching prices:", error);
        return { BTC: null, ETH: null, Doge: null };
    }
}
