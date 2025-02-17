// import { useState } from "react";
// import axios from "axios";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const CryptoPortfolioOptimizer = () => {
//   const cryptoSymbols = [
//     "BTC-USD",
//     "ETH-USD",
//     "ADA-USD",
//     "DOGE-USD",
//     "SOL-USD",
//     "XRP-USD",
//   ];
//   const [selectedSymbols, setSelectedSymbols] = useState([
//     "BTC-USD",
//     "ETH-USD",
//   ]);
//   const [budget, setBudget] = useState(1000000);
//   const [populationSize, setPopulationSize] = useState(100);
//   const [generations, setGenerations] = useState(100);
//   const [mutationRate, setMutationRate] = useState(0.1);
//   const [startDate, setStartDate] = useState("2021-01-01");
//   const [endDate, setEndDate] = useState("2024-12-31");
//   const [portfolioData, setPortfolioData] = useState(null);

//   const fetchCryptoData = async () => {
//     try {
//       const responses = await Promise.all(
//         selectedSymbols.map((symbol) =>
//           axios.get(
//             `/api/crypto-data?symbol=${symbol}&start=${startDate}&end=${endDate}`
//           )
//         )
//       );
//       return responses.map((res) => res.data);
//     } catch (error) {
//       console.error("Error fetching data", error);
//       return [];
//     }
//   };

//   const geneticAlgorithm = (cryptoData) => {
//     const numSymbols = selectedSymbols.length;
//     let population = Array.from({ length: populationSize }, () =>
//       Array(numSymbols)
//         .fill()
//         .map(() => Math.random())
//     );

//     for (let gen = 0; gen < generations; gen++) {
//       const fitnessScores = population.map((ind) =>
//         fitnessFunction(ind, cryptoData)
//       );
//       const sortedIndices = fitnessScores
//         .map((score, i) => [score, i])
//         .sort((a, b) => b[0] - a[0])
//         .map(([_, i]) => i);
//       population = sortedIndices
//         .slice(0, populationSize / 2)
//         .map((i) => population[i]);
//       while (population.length < populationSize) {
//         const parent1 =
//           population[Math.floor(Math.random() * population.length)];
//         const parent2 =
//           population[Math.floor(Math.random() * population.length)];
//         const child = parent1.map(
//           (val, i) =>
//             (val + parent2[i]) / 2 +
//             (Math.random() * mutationRate - mutationRate / 2)
//         );
//         population.push(child);
//       }
//     }
//     return population[0];
//   };

//   const fitnessFunction = (weights, cryptoData) => {
//     const portfolioReturns = cryptoData.reduce(
//       (acc, data, i) => acc + data * weights[i],
//       0
//     );
//     return (
//       (portfolioReturns[portfolioReturns.length - 1] / portfolioReturns[0] -
//         1) *
//       100
//     );
//   };

//   const optimizePortfolio = async () => {
//     const cryptoData = await fetchCryptoData();
//     if (!cryptoData.length) return;
//     const bestWeights = geneticAlgorithm(cryptoData);
//     setPortfolioData({ selectedSymbols, bestWeights });
//   };

//   return (
//     <div style={{ padding: "16px", maxWidth: "800px", margin: "auto" }}>
//       <h1
//         style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}
//       >
//         Crypto Portfolio Optimizer
//       </h1>
//       <div
//         style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
//       >
//         <select
//           multiple
//           value={selectedSymbols}
//           onChange={(e) =>
//             setSelectedSymbols(
//               [...e.target.selectedOptions].map((o) => o.value)
//             )
//           }
//           style={{ padding: "8px", border: "1px solid #ccc" }}
//         >
//           {cryptoSymbols.map((symbol) => (
//             <option key={symbol} value={symbol}>
//               {symbol}
//             </option>
//           ))}
//         </select>
//         <input
//           type="number"
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)}
//           style={{ padding: "8px", border: "1px solid #ccc" }}
//         />
//       </div>
//       <button
//         onClick={optimizePortfolio}
//         style={{
//           marginTop: "16px",
//           padding: "8px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//         }}
//       >
//         Optimize
//       </button>
//       {portfolioData && (
//         <div style={{ marginTop: "16px" }}>
//           <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Results</h2>
//           <p>Selected Cryptos: {portfolioData.selectedSymbols.join(", ")}</p>
//           <Line
//             data={{
//               labels: [...Array(cryptoData[0].length).keys()],
//               datasets: [
//                 { label: "Portfolio Returns", data: portfolioData.bestWeights },
//               ],
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CryptoPortfolioOptimizer;

import React from "react";

const GeneticAlgori = () => {
  return <div>GeneticAlgori</div>;
};

export default GeneticAlgori;
