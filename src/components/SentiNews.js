// import { Alert } from "flowbite-react";
// import React, { useState } from "react";
// const vader = require("vader-sentiment");
// const stopword = require("stopword");
// const axios = require("axios");
// // const dotenv = require("dotenv");
// // dotenv.config();
// function NewsSentimentComponent() {
//   const [ticker, setTicker] = useState("");
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState(null);

//   const extractTickerData = async (ticker) => {
//     const API_KEY = "d1f9ee0c488b4cff9d09285615f6c453";
//     const url = "https://newsapi.org/v2/everything";
//     const crypto = ticker;
//     const params = {
//       q: crypto, // Search for crypto-related terms
//       language: "en", // Language of the articles
//       sortBy: "publishedAt", // Sort by publication date
//       pageSize: 20, // Limit to 20 results
//       apiKey: API_KEY,
//     };
//     function preprocessText(text) {
//       if (!text) return ""; // Handle empty text
//       // Convert to lowercase
//       text = text.toLowerCase();
//       // Remove punctuation
//       text = text.replace(/[^\w\s]/g, "");
//       // Remove stopwords
//       const words = text.split(" ");
//       const filteredWords = stopword.removeStopwords(words);
//       return filteredWords.join(" ");
//     }
//     function analyzeSentiment(text) {
//       const result = vader.SentimentIntensityAnalyzer.polarity_scores(text);
//       return result;
//     }

//     function classifyNature(sentiment) {
//       if (sentiment.compound > 0.05) return "Bullish";
//       if (sentiment.compound < -0.05) return "Bearish";
//       return "Neutral";
//     }

//     try {
//       axios
//         .get(url, { params })
//         .then((response) => {
//           const data = response.data;
//           if (data.status === "ok") {
//             const articles = data.articles;

//             console.log(results);

//             articles.forEach((article) => {
//               const title = article.title || "";
//               const content = article.description || article.content || "";
//               const fullText = `${title}. ${content}`;
//               // Preprocess text
//               const processedText = preprocessText(fullText);
//               // Analyze sentiment
//               const sentiment = analyzeSentiment(processedText);
//               const nature = classifyNature(sentiment);
//               console.log(sentiment, nature);
//               // Display results
//               // console.log(`Title: ${title}`);
//               // console.log(`Source: ${article.source.name}`);
//               // console.log(`URL: ${article.url}`);
//               // console.log(`Sentiment: ${sentiment.compound} (${nature})`);
//               // console.log(`Relevance to Bitcoin: ${isRelevantToBitcoin}`);
//               // console.log("-".repeat(50));
//             });
//           } else {
//             console.error("Error fetching news:", data.message);
//           }
//         })
//         .catch((error) => {
//           console.error("Error:", error.message);
//         });
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (ticker) {
//       extractTickerData(ticker);
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "100px 150px 150px 150px",
//         fontFamily: "Arial, sans-serif",
//         background: "var(--bg_color)",
//         // minHeight: "100vh",
//       }}
//     >
//       <div
//         style={{
//           border: "2px solid var(--text_color)",
//           borderRadius: "10px",
//           padding: "40px",
//           backgroundColor: "var(--bg_color)",
//           boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//           maxWidth: "800px",
//           margin: "0 auto",
//         }}
//       >
//         <h2
//           style={{
//             color: "var(--text_color)",
//             textAlign: "center",
//             marginBottom: "20px",
//             fontSize: "24px",
//           }}
//         >
//           News Sentiment Analysis
//         </h2>
//         <form
//           onSubmit={handleSubmit}
//           style={{
//             marginBottom: "20px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <input
//             type="text"
//             value={ticker}
//             onChange={(e) => setTicker(e.target.value)}
//             placeholder="Enter ticker (e.g., BTC-USD)"
//             style={{
//               padding: "12px",
//               fontSize: "16px",
//               borderRadius: "8px",
//               border: "1px solid var(--text_color)",
//               width: "100%",
//               maxWidth: "400px",
//               marginBottom: "20px",
//               background: "var(--bg_color)",
//               color: "var(--text_color)",
//             }}
//           />
//           <button
//             type="submit"
//             style={{
//               cursor: "pointer",
//               padding: "10px 20px",
//               fontSize: "16px",
//               borderRadius: "8px",
//               border: "none",
//               color: "#ffffff",
//               backgroundColor: "#00796b",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//               transition: "background-color 0.3s ease",
//             }}
//             onMouseEnter={(e) => (e.target.style.backgroundColor = "#005b4f")}
//             onMouseLeave={(e) => (e.target.style.backgroundColor = "#00796b")}
//           >
//             Analyze
//           </button>
//         </form>

//         {error && (
//           <p style={{ color: "#d32f2f", textAlign: "center" }}>{error}</p>
//         )}

//         {results && results.length > 0 && (
//           <div
//             style={{
//               marginTop: "30px",
//               padding: "20px",
//               backgroundColor: "var(--bg_color)",
//               borderRadius: "8px",
//               border: "2px solid var(--text_color)",
//             }}
//           >
//             <h3
//               style={{
//                 textAlign: "center",
//                 marginBottom: "20px",
//                 color: "var(--text_color)",
//                 fontSize: "20px",
//               }}
//             >
//               Results for {ticker}:
//             </h3>
//             <ul style={{ padding: "0" }}>
//               {results.map((item, index) => (
//                 <li
//                   key={index}
//                   style={{
//                     marginBottom: "20px",
//                     listStyleType: "none",
//                     borderBottom: "1px solid #cfd8dc",
//                     paddingBottom: "10px",
//                   }}
//                 >
//                   <a
//                     href={item.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{
//                       color: "#00796b",
//                       textDecoration: "none",
//                       fontSize: "18px",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {item.title}
//                   </a>
//                   <p style={{ margin: "10px 0", color: "var(--text_color)" }}>
//                     {item.summary}
//                   </p>
//                   <p style={{ fontSize: "14px", color: "var(--text_color)" }}>
//                     <strong>1) Relevance Score:</strong> {item.relevance_score}
//                   </p>
//                   <p style={{ fontSize: "14px", color: "var(--text_color)" }}>
//                     <strong>2) Sentiment Score:</strong>{" "}
//                     {item.ticker_sentiment_score}
//                   </p>
//                   <p style={{ fontSize: "14px", color: "var(--text_color)" }}>
//                     <strong>3) Sentiment Label:</strong>{" "}
//                     {item.ticker_sentiment_label}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {results && results.length === 0 && (
//           <p style={{ textAlign: "center", color: "#37474f" }}>
//             No relevant news found for {ticker}.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default NewsSentimentComponent;

import React, { useState } from "react";

function NewsSentimentComponent() {
  const [ticker, setTicker] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const extractTickerData = async (ticker) => {
    const apiKey = "H7SY87NVYDCF4T1J";
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        setError(`Failed to fetch data: ${response.status}`);
        return;
      }

      const data = await response.json();
      const feed = data.feed || [];

      const results = feed
        .map((item) => {
          const tickerData = item.ticker_sentiment.find(
            (ts) => ts.ticker === ticker
          );

          if (tickerData) {
            return {
              title: item.title,
              summary: item.summary,
              url: item.url,
              relevance_score: tickerData.relevance_score,
              ticker_sentiment_score: tickerData.ticker_sentiment_score,
              ticker_sentiment_label: tickerData.ticker_sentiment_label,
            };
          }
          return null;
        })
        .filter(Boolean);

      setResults(results);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticker) {
      extractTickerData(ticker);
    }
  };

  return (
    <div
      style={{
        padding: "100px 150px 150px 150px",
        fontFamily: "Arial, sans-serif",
        background: "var(--bg_color)",
        // minHeight: "100vh",
      }}
    >
      <div
        style={{
          border: "2px solid var(--text_color)",
          borderRadius: "10px",
          padding: "40px",
          backgroundColor: "var(--bg_color)",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            color: "var(--text_color)",
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "24px",
          }}
        >
          News Sentiment Analysis
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="Enter ticker (e.g., BTC-USD)"
            style={{
              padding: "12px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid var(--text_color)",
              width: "100%",
              maxWidth: "400px",
              marginBottom: "20px",
              background: "var(--bg_color)",
              color: "var(--text_color)",
            }}
          />
          <button
            type="submit"
            style={{
              cursor: "pointer",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              color: "#ffffff",
              backgroundColor: "#00796b",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#005b4f")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#00796b")}
          >
            Analyze
          </button>
        </form>

        {error && (
          <p style={{ color: "#d32f2f", textAlign: "center" }}>{error}</p>
        )}

        {results && results.length > 0 && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              backgroundColor: "var(--bg_color)",
              borderRadius: "8px",
              border: "2px solid var(--text_color)",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "var(--text_color)",
                fontSize: "20px",
              }}
            >
              Results for {ticker}:
            </h3>
            <ul style={{ padding: "0" }}>
              {results.map((item, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "20px",
                    listStyleType: "none",
                    borderBottom: "1px solid #cfd8dc",
                    paddingBottom: "10px",
                  }}
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#00796b",
                      textDecoration: "none",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </a>
                  <p style={{ margin: "10px 0", color: "var(--text_color)" }}>
                    {item.summary}
                  </p>
                  <p style={{ fontSize: "14px", color: "var(--text_color)" }}>
                    <strong>1) Relevance Score:</strong> {item.relevance_score}
                  </p>
                  <p style={{ fontSize: "14px", color: "var(--text_color)" }}>
                    <strong>2) Sentiment Score:</strong>{" "}
                    {item.ticker_sentiment_score}
                  </p>
                  <p style={{ fontSize: "14px", color: "var(--text_color)" }}>
                    <strong>3) Sentiment Label:</strong>{" "}
                    {item.ticker_sentiment_label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {results && results.length === 0 && (
          <p style={{ textAlign: "center", color: "#37474f" }}>
            No relevant news found for {ticker}.
          </p>
        )}
      </div>
    </div>
  );
}

export default NewsSentimentComponent;
