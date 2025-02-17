const express = require("express");
const fetch = require("node-fetch2");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const router = express.Router();

//R1:Get all stocks from external API and If logged get watchlist.

//R1.o - Better one gpt
router.get("/fetchalltokens", async (req, res) => {
  let user = null;
  const token = req.header("auth-token");
  if (token) {
    try {
      const data = jwt.verify(token, "RVesting");
      user = data.user;
    } catch (error) {
      user = null;
    }
  }
  try {
    const { page } = req.query;
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`;
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
      },
    });
    const tokens = await response.json();

    if (tokens.status && tokens.status.error_code === 429) {
      res.json({ status: 429, message: "Exceeded the limit" });
    } else {
      if (user) {
        const [rows] = await db
          .promise()
          .query("SELECT watchlist FROM users WHERE id = ?", [user.id]);
        const watchlist = rows[0]?.watchlist ? rows[0].watchlist : [];
        tokens.forEach((token) => {
          token.iswatchlisted = watchlist.includes(token.id);
        });
      }

      res.json(tokens);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error while fetching all stocks" });
  }
});

//R2-Get watchlisted stocks
// router.get("/fetchwatchlisted", fetchuser, async (req, res) => {
//   try {
//     db.query(
//       "SELECT watchlist FROM users WHERE id = ?",
//       [req.user.id],
//       (err, rows) => {
//         if (err) {
//           console.error(err.message);
//           return res
//             .status(500)
//             .send("Error while fetching watchlisted stocks");
//         }
//         if (rows.length === 0) {
//           return res.status(404).json({ message: "User not found" });
//         }
//         const watchlist = rows[0].watchlist ? rows[0].watchlist : [];
//         res.json(watchlist);
//       }
//     );
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Error occured while fetching watchlisted stocks.");
//   }
// });
router.get("/fetchwatchlisted", fetchuser, async (req, res) => {
  try {
    db.query(
      "SELECT watchlist FROM users WHERE id = ?",
      [req.user.id],
      (err, rows) => {
        if (err) {
          console.error(err.message);
          return res
            .status(500)
            .send("Some error occurred while fetching watchlisted coins");
        }

        if (rows.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        const watchlist = rows[0].watchlist ? rows[0].watchlist : [];
        res.json(watchlist);
      }
    );
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send("Some error occurred while fetching watchlisted coins");
  }
});

//Update cash
router.post("/updateCash", fetchuser, async (req, res) => {
  // console.log(req.user);
  try {
    db.query(
      "UPDATE users SET cash = cash + ? WHERE id = ?",
      [req.body.cash, req.user.id],
      (err) => {
        if (err) {
          console.error(err.message);
          return res
            .status(500)
            .send("Some error occurred while updating cash");
        }
        res.status(200).send("Cash updated successfully");
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred while updating cash");
  }
});

//R-3:Get specific active stocks
// router.get("/fetchtoken/:symbol", async (req, res) => {
//   let user = null;
//   const token = req.header("auth-token");
//   if (token) {
//     try {
//       const data = jwt.verify(token, "RVesting");
//       user = data.user;
//     } catch (err) {
//       user = null;
//     }
//   }
//   try {
//     const symbol = req.params.symbol;
//     // console.log(symbol);
//     if (!symbol) {
//       return res.status(400).json({ error: "Check stock symbol" });
//     }

//     // API Endpoints
//     const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=ctcole1r01qlc0uv8ia0ctcole1r01qlc0uv8iag`;
//     const profileUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=ctcole1r01qlc0uv8ia0ctcole1r01qlc0uv8iag`;

//     const [quoteRes, profileRes] = await Promise.all([
//       fetch(quoteUrl),
//       fetch(profileUrl),
//     ]);

//     const quoteData = await quoteRes.json();
//     const profileData = await profileRes.json();

//     const output = {
//       id: profileData.ticker || symbol,
//       symbol: profileData.ticker || symbol,
//       name: profileData.name || "N/A",
//       image: profileData.logo || "N/A",
//       current_price: quoteData.c || 0,
//       market_cap: profileData.marketCapitalization || 0,
//       total_volume: "N/A", // Not directly available
//       high_24h: quoteData.h || 0,
//       low_24h: quoteData.l || 0,
//       price_change_24h: quoteData.d || 0,
//       price_change_percentage_24h: quoteData.dp || 0,
//       roi: null, // Not directly available
//       weburl: profileData.weburl,
//       country: profileData.country,
//       phone: profileData.phone,
//       open_price: quoteData.o,
//       previous_closeprice: quoteData.pc,
//       last_updated: new Date().toISOString(),
//     };

//     res.json(output);
//   } catch (error) {
//     console.error(error.message);
//     res
//       .status(500)
//       .json({ error: "Error while fetching stock data in router 3" });
//   }
// });
router.get("/fetchtoken/:symbol", async (req, res) => {
  let user = null;
  const token = req.header("auth-token");
  if (token) {
    try {
      const data = jwt.verify(token, "RVesting");
      user = data.user;
    } catch (error) {
      user = null;
    }
  }

  try {
    const symbol = req.params.symbol;
    const url = `https://api.coingecko.com/api/v3/coins/${symbol}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`;
    const response = await fetch(url);

    if (response.status === 404) {
      const error = await response.json();
      res.status(404).json({ error: error.error });
      return;
    }

    const token = await response.json();

    delete token.asset_platform_id;
    delete token.platforms;
    delete token.detail_platforms;
    delete token.ico_data;
    delete token.public_interest_stats;

    delete token.links.chat_url;
    delete token.links.announcement_url;
    delete token.links.facebook_username;
    delete token.links.repos_url;
    delete token.links.bitcointalk_thread_identifier;

    delete token.market_data.ath;
    delete token.market_data.ath_change_percentage;
    delete token.market_data.ath_date;
    delete token.market_data.atl;
    delete token.market_data.atl_change_percentage;
    delete token.market_data.atl_date;
    delete token.market_data.fully_diluted_valuation;
    delete token.market_data.high_24h;
    delete token.market_data.low_24h;

    for (let currency in token.market_data.current_price) {
      if (!["inr", "usd", "eur", "btc", "eth", "gbp"].includes(currency)) {
        delete token.market_data.current_price[currency];
        delete token.market_data.market_cap[currency];
        delete token.market_data.total_volume[currency];
      }
    }

    if (user) {
      const [rows] = db.query("SELECT watchlist FROM users WHERE id = ?", [
        user.id,
      ]);
      const watchlist = rows[0].watchlist ? JSON.parse(rows[0].watchlist) : [];
      token.iswatchlisted = watchlist.includes(token.id);
    }

    res.status(200).json(token);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Some error occurred" });
  }
});

//R-4:Get active stocks owned by user
router.get("/fetchactive", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    db.query(
      `SELECT *, getAverageCost(?,token_id) AS averageCost,
      (SELECT SUM(quantity * getAverageCost(user_id,token_id)) FROM active WHERE user_id = ?) AS totalInvested
      FROM active 
      WHERE user_id = ?
      GROUP BY id`,
      [userId, userId, userId],
      async (err, tokens) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send("Error while fetching active stocks");
        }
        if (tokens.length === 0) {
          return res.json({ tokenIds: [], tokens: [] });
        }
        const totalInvested = tokens[0].totalInvested;
        const tokenIds = tokens.map((token) => token.token_id);
        console.log(tokenIds);
        res.json({ tokenIds, tokens, totalInvested });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error while fetching active stocks");
  }
});

//R-5:Get transaction history
router.get("/fetchtransactions", fetchuser, async (req, res) => {
  try {
    db.query(
      "SELECT * FROM transactions WHERE user_id =? ORDER BY txn_timestamp DESC",
      [req.user.id],
      (err, transactions) => {
        if (err) {
          console.error(err.message);
          return res
            .status(500)
            .send("Error while fetching transaction from database");
        }
        res.json(transactions);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error while fetching transaction history");
  }
});

//R-6:Get stock details owned by user
router.get("/fetchdetails-legacy", fetchuser, async (req, res) => {
  try {
    const { token_id } = req.query;
    db.query(
      "SELECT * FROM active WHERE user_id = ? AND token_id = ?",
      [req.user.id, token_id],
      async (err, activeTokens) => {
        if (err) {
          console.error(err.message);
          return res
            .status(500)
            .send("Error selecting stock details owned by user");
        }
        db.query(
          "SELECT * FROM transactions WHERE user_id = ? AND token_id = ? ORDER BY txn_timestamp DESC",
          [req.user.id, token_id],
          async (err, transactions) => {
            if (err) {
              console.error(err.message);
              return res
                .status(500)
                .send("Error while selecting stocks from transactions");
            }
            if (activeTokens.length > 0) {
              const averageCost = await getAverageCostLegacy(
                req.user.id,
                activeTokens[0].token_id
              );
              activeTokens[0].averageCost = averageCost;
            }

            db.query(
              "SELECT watchlist FROM users WHERE id = ?",
              [req.user.id],
              (err, rows) => {
                if (err) {
                  console.error(err.message);
                  return res.status(500).send("Error fetching watchlist");
                }
                const iswatchlisted = rows[0]?.watchlist
                  ? rows[0].watchlist.includes(token_id)
                  : false;

                res.json({
                  activeTokens,
                  transactions,
                  iswatchlisted,
                });
              }
            );
          }
        );
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error while fetching deails of the owned stocks");
  }
});

//R-6.o:Get stock detials improved by GPT
router.get("/fetchdetails", fetchuser, async (req, res) => {
  try {
    const { token_id } = req.query;

    db.query(
      `SELECT a.*,t.*,getAverageCost(a.user_id,a.token_id) AS averageCost FROM active a JOIN transactions t ON a.user_id = t.user_id AND a.token_id = t.token_id WHERE a.user_id = ? AND a.token_id = ?`,
      [req.user.id, token_id],
      async (err, result) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send("Erro in router 6.o");
        }
        db.query(
          "SELECT watchlist FROM users WHERE id = ?",
          [req.user.id],
          (err, rows) => {
            if (err) {
              console.error(err.message);
              return res
                .status(500)
                .send("Error fetching watchlist in router 6.o");
            }
            const iswatchlisted = rows[0]?.watchlist
              ? rows[0].watchlist.includes(token_id)
              : false;

            res.json({ result, iswatchlisted });
          }
        );
      }
    );
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send("Error while fetching details of the stock router 6.0");
  }
});

//getAverageCost function
const getAverageCostLegacy = async (uesr_id, token_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM transactions WHERE user_id = ? AND token_id = ?",
      [uesr_id, token_id],
      (err, transactions) => {
        if (error) {
          console.error(error.message);
          return res
            .status(500)
            .send("Erro while fetching transactions in getAverageCostLegacy");
        }

        let quantitySum = 0;
        let priceSum = 0;

        transactions.forEach((trans) => {
          quantitySu += trans.quantity;
          priceSum += trans.price * trans.quantity;
        });

        const averageCost = quantitySum > 0 ? priceSum / quantitySum : 0;
        resolve(averageCost);
      }
    );
  });
};

//development
router.get("/fetchonestock", async (req, res) => {
  const token = req.header("auth-token");
  let user = null;

  if (token) {
    try {
      const data = jwt.verify(token, "RVesting");
      user = data.user;
    } catch (error) {
      user = null;
    }
  }

  try {
    const { symbol } = req.query;

    if (!symbol) {
      return res.status(400).json({ error: "Stock symbol is required" });
    }

    // API Endpoints
    const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=ctcole1r01qlc0uv8ia0ctcole1r01qlc0uv8iag`;
    const profileUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=ctcole1r01qlc0uv8ia0ctcole1r01qlc0uv8iag`;

    const [quoteRes, profileRes] = await Promise.all([
      fetch(quoteUrl),
      fetch(profileUrl),
    ]);

    const quoteData = await quoteRes.json();
    const profileData = await profileRes.json();

    const output = {
      id: profileData.ticker || symbol,
      symbol: profileData.ticker || symbol,
      name: profileData.name || "N/A",
      image: profileData.logo || "N/A",
      current_price: quoteData.c || 0,
      market_cap: profileData.marketCapitalization || 0,
      total_volume: "N/A", // Not directly available
      high_24h: quoteData.h || 0,
      low_24h: quoteData.l || 0,
      price_change_24h: quoteData.d || 0,
      price_change_percentage_24h: quoteData.dp || 0,
      roi: null, // Not directly available
      weburl: profileData.weburl,
      country: profileData.country,
      phone: profileData.phone,
      open_price: quoteData.o,
      previous_closeprice: quoteData.pc,
      last_updated: new Date().toISOString(),
    };

    res.json(output);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error while fetching stock data" });
  }
});

module.exports = router;
