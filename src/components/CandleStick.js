import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

function CryptoCandlestickChart() {
  const [symbol, setSymbol] = useState("bitcoin");
  const [timeLength, setTimeLength] = useState(30);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      const apiUrl = `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=${timeLength}&x_cg_demo_api_key=CG-jnExJhB6zaJy6aSV5CzpouTq`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();

        // Process price data to calculate OHLC for each day
        const prices = data.prices;
        const ohlcData = [["Date", "Low", "Open", "Close", "High"]];
        let dailyData = [];

        prices.forEach(([timestamp, price], index) => {
          const date = new Date(timestamp).toDateString();
          if (!dailyData[date]) {
            dailyData[date] = {
              open: price,
              high: price,
              low: price,
              close: price,
            };
          } else {
            dailyData[date].high = Math.max(dailyData[date].high, price);
            dailyData[date].low = Math.min(dailyData[date].low, price);
            dailyData[date].close = price; // Set the close price to the latest price
          }
        });

        Object.keys(dailyData).forEach((date) => {
          const { open, high, low, close } = dailyData[date];
          ohlcData.push([date, low, open, close, high]);
        });

        setChartData(ohlcData);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError(err.message);
      }
    };

    fetchCryptoData();
  }, [symbol, timeLength]);

  const options = {
    title: `${symbol.toUpperCase()} Price Chart - Last ${timeLength} Days`,
    legend: "none",
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "#a52714" },
      risingColor: { strokeWidth: 0, fill: "#0f9d58" },
    },
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
        marginTop: "50px",
        marginBottom: "100px",
        textAlign: "center",
        color: "var(--text_color)",
      }}
    >
      <h1
        style={{
          marginBottom: "40px",
        }}
      >
        Cryptocurrency Price Chart
      </h1>
      <label htmlFor="cryptoSymbol" style={{ marginRight: "10px" }}>
        Select Cryptocurrency:
      </label>
      <select
        id="cryptoSymbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        style={{
          margin: "10px 0",
          padding: "5px",
          marginRight: "20px",
          background: "var(--bg_color)",
          color: "var(--text_color)",
          border: "2px solid var(--text_color)",
          borderRadius: "10px",
        }}
      >
        <option value="bitcoin">Bitcoin (BTC)</option>
        <option value="ethereum">Ethereum (ETH)</option>
        <option value="binancecoin">BNB (BNB)</option>
        <option value="cardano">Cardano (ADA)</option>
        <option value="ripple">XRP (XRP)</option>
        <option value="dogecoin">Dogecoin (DOGE)</option>
        <option value="solana">Solana (SOL)</option>
        <option value="polkadot">Polkadot (DOT)</option>
        <option value="tron">TRON (TRX)</option>
        <option value="avalanche-2">Avalanche (AVAX)</option>
        <option value="litecoin">Litecoin (LTC)</option>
        <option value="wrapped-bitcoin">Wrapped Bitcoin (WBTC)</option>
        <option value="shiba-inu">Shiba Inu (SHIB)</option>
        <option value="matic-network">Polygon (MATIC)</option>
        <option value="dai">Dai (DAI)</option>
        <option value="bitcoin-cash">Bitcoin Cash (BCH)</option>
        <option value="cosmos">Cosmos (ATOM)</option>
        <option value="ethereum-classic">Ethereum Classic (ETC)</option>
        <option value="chainlink">Chainlink (LINK)</option>
        <option value="stellar">Stellar (XLM)</option>
        <option value="monero">Monero (XMR)</option>
        <option value="filecoin">Filecoin (FIL)</option>
        <option value="internet-computer">Internet Computer (ICP)</option>
        <option value="vechain">VeChain (VET)</option>
        <option value="theta-token">Theta Network (THETA)</option>
        <option value="lido-dao">Lido DAO (LDO)</option>
        <option value="algorand">Algorand (ALGO)</option>
        <option value="axie-infinity">Axie Infinity (AXS)</option>
        <option value="flow">Flow (FLOW)</option>
        <option value="near-protocol">NEAR Protocol (NEAR)</option>
        <option value="apecoin">ApeCoin (APE)</option>
        <option value="decentraland">Decentraland (MANA)</option>
        <option value="the-sandbox">The Sandbox (SAND)</option>
        <option value="aave">Aave (AAVE)</option>
        <option value="hedera-hashgraph">Hedera (HBAR)</option>
        <option value="eos">EOS (EOS)</option>
        <option value="fantom">Fantom (FTM)</option>
        <option value="terra-luna">Terra Classic (LUNC)</option>
        <option value="paxos-standard">Pax Dollar (USDP)</option>
        <option value="binance-usd">Binance USD (BUSD)</option>
        <option value="usd-coin">USD Coin (USDC)</option>
        <option value="tether">Tether (USDT)</option>
      </select>
      <label htmlFor="timeLength" style={{ marginRight: "10px" }}>
        Select Time Length:
      </label>
      <select
        id="timeLength"
        value={timeLength}
        onChange={(e) => setTimeLength(parseInt(e.target.value, 10))}
        style={{
          margin: "10px 0",
          padding: "5px",
          marginRight: "20px",
          background: "var(--bg_color)",
          color: "var(--text_color)",
          border: "2px solid var(--text_color)",
          borderRadius: "10px",
        }}
      >
        <option value="7">Last 1 Week</option>
        <option value="14">Last 2 Weeks</option>
        <option value="21">Last 3 Weeks</option>
        <option value="30">Last 1 Months</option>
        <option value="60">Last 2 Months</option>
        <option value="90">Last 3 Months</option>
        <option value="120">Last 4 Months</option>
        <option value="180">Last 6 Months</option>
        <option value="360">Last 1 Year</option>
      </select>
      <div id="candlestickChart" style={{ marginTop: 20 }}>
        {chartData.length > 1 ? (
          <Chart
            chartType="CandlestickChart"
            width="100%"
            height="450px"
            data={chartData}
            options={options}
          />
        ) : (
          <p>{error ? error : "Loading chart..."}</p>
        )}
      </div>
    </div>
  );
}

export default CryptoCandlestickChart;
