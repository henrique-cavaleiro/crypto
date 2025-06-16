// CryptoChart.js
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const MAX_POINTS = 50;

// Format time to avoid mismatch
const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

const CryptoChart = ({ prices, currency, refreshRate }) => {
  const unit = currency === "EUR" ? "€" : "$";

  const [btcChartData, setBtcChartData] = useState({
    labels: [],
    datasets: [
      {
        label: `BTC Price (${unit})`,
        data: [],
        borderColor: "red",
        fill: false,
        tension: 0
      },
    ],
  });

  const [ethChartData, setEthChartData] = useState({
    labels: [],
    datasets: [
      {
        label: `ETH Price (${unit})`,
        data: [],
        borderColor: "blue",
        fill: false,
      },
    ],
  });

  const [dogeChartData, setDogeChartData] = useState({        // examen
    labels: [],
    datasets: [
      {
        label: `DOGE Price (${unit})`,
        data: [],
        borderColor: "yellow",
        fill: false,
      },
    ],
  });

  // Load historical data
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Clear previous data
        setBtcChartData({
          labels: [],
          datasets: [
            {
              label: `BTC Price (${unit})`,
              data: [],
              borderColor: "red",
              fill: false,
            },
          ],
        });

        setEthChartData({
          labels: [],
          datasets: [
            {
              label: `ETH Price (${unit})`,
              data: [],
              borderColor: "blue",
              fill: false,
            },
          ],
        });

        setDogeChartData({        // examen
          labels: [],
          datasets: [
            {
              label: `DOGE Price (${unit})`,
              data: [],
              borderColor: "yellow",
              fill: false,
            },
          ],
        });
        
        const res = await fetch(`http://192.168.5.186:3500/api/history?currency=${currency}`);
        const data = await res.json();

        const btcLabels = [];
        const btcData = [];
        const ethLabels = [];
        const ethData = [];
        const dogeLabels = [];      // examen
        const dogeData = [];        // examen

        data.reverse().forEach((entry) => {
          const timeLabel = formatTime(new Date(entry.timestamp));
          if (entry.symbol === "BTC") {
            btcLabels.push(timeLabel);
            btcData.push(parseFloat(entry.price));
          } else if (entry.symbol === "ETH") {
            ethLabels.push(timeLabel);
            ethData.push(parseFloat(entry.price));
          } else if (entry.symbol === "DOGE") {     // examen
            dogeLabels.push(timeLabel);
            dogeData.push(parseFloat(entry.price));
          }
        });

        setBtcChartData({
          labels: btcLabels.slice(-MAX_POINTS),
          datasets: [
            {
              label: `BTC Price (${unit})`,
              data: btcData.slice(-MAX_POINTS),
              borderColor: "red",
              fill: false,
            },
          ],
        });

        setEthChartData({
          labels: ethLabels.slice(-MAX_POINTS),
          datasets: [
            {
              label: `ETH Price (${unit})`,
              data: ethData.slice(-MAX_POINTS),
              borderColor: "blue",
              fill: false,
            },
          ],
        });

          setDogeChartData({          // examen
          labels: dogeLabels.slice(-MAX_POINTS),
          datasets: [
            {
              label: `DOGE Price (${unit})`,
              data: dogeData.slice(-MAX_POINTS),
              borderColor: "yellow",
              fill: false,
            },
          ],
        });

      } catch (err) {
        console.error("Error loading history:", err);
      }
    };

    fetchHistory();
  }, [currency, refreshRate]);

  // Handle live updates
  useEffect(() => {
    const now = formatTime(new Date());

    if (prices.BTC) {
      setBtcChartData((prevData) => {
        if (prevData.labels[prevData.labels.length - 1] === now) return prevData;

        const newLabels = [...prevData.labels, now];
        const newData = [...prevData.datasets[0].data, prices.BTC];

        if (newLabels.length > MAX_POINTS) {
          newLabels.shift();
          newData.shift();
        }

        return {
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              label: `BTC Price (${unit})`,
              data: newData,
            },
          ],
        };
      });
    }

    if (prices.ETH) {
      setEthChartData((prevData) => {
        if (prevData.labels[prevData.labels.length - 1] === now) return prevData;

        const newLabels = [...prevData.labels, now];
        const newData = [...prevData.datasets[0].data, prices.ETH];

        if (newLabels.length > MAX_POINTS) {
          newLabels.shift();
          newData.shift();
        }

        return {
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              label: `ETH Price (${unit})`,
              data: newData,
            },
          ],
        };
      });
    }

    if (prices.DOGE) {        // examen
      setDogeChartData((prevData) => {
        if (prevData.labels[prevData.labels.length - 1] === now) return prevData;

        const newLabels = [...prevData.labels, now];
        const newData = [...prevData.datasets[0].data, prices.DOGE];

        if (newLabels.length > MAX_POINTS) {
          newLabels.shift();
          newData.shift();
        }

        return {
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              label: `DOGE Price (${unit})`,  
              data: newData,
            },
          ],
        };
      });
    }
  }, [prices]);

  return (
    <div>
      <h2>Live BTC Price Chart ({unit})</h2>
      <Line data={btcChartData} />

      <h2>Live ETH Price Chart ({unit})</h2>
      <Line data={ethChartData} />
            
      <h2>Live DOGE Price Chart ({unit})</h2>   {/* examen */}
      <Line data={dogeChartData} />
    </div>
  );
};

export default CryptoChart;
