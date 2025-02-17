import Link from "next/link";
import React from "react";
import Image from "next/image";
import WatchList from "./Watchlist";

const TokenItemList = ({ token, userData, columnStyles }) => {
  const refreshPage = () => {
    window.location.reload();
  };

  const tokenUrl = `coins/${token.id}`;

  const rowStyle = {
    display: "table-row",
    borderRadius: "0.375rem",
    color: "var(--text_color)",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const cellStyle = {
    display: "table-cell",
    verticalAlign: "middle",
    borderBottom: "1px solid var(--text_color)",
    padding: "0.75rem",
  };

  const stickyCellStyle = {
    ...cellStyle,
    position: "sticky",
    left: 0,
    backgroundColor: "var(--bg_color)",
    zIndex: 1,
  };

  const imageStyle = {
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    marginRight: "0.5rem",
  };

  const flexContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const badgeStyle = (isPositive) => ({
    fontSize: "0.75rem",
    fontWeight: "500",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    border: `1px solid ${isPositive ? "#4ade80" : "#f87171"}`,
    color: isPositive ? "#4ade80" : "#f87171",
    textAlign: "center",
  });

  return (
    <Link
      href={tokenUrl}
      style={{
        ...rowStyle,
        textDecoration: "none",
        ":hover": { backgroundColor: "#3f3f46" },
      }}
    >
      <div style={{ ...cellStyle, ...columnStyles.rank, padding: "1.5rem" }}>
        {token.market_cap_rank}
      </div>
      <div style={{ ...stickyCellStyle, ...columnStyles.name }}>
        <div style={flexContainerStyle}>
          <Image
            loader={() => token.image}
            unoptimized={true}
            height={32}
            width={32}
            src={token.image}
            alt={token.name}
            style={imageStyle}
          />
          <div>
            <p style={{ margin: "0 0 0.25rem 0", fontWeight: "500" }}>
              {token.name}
            </p>
            <p style={{ margin: 0 }}>{token.symbol.toUpperCase()}</p>
          </div>
        </div>
      </div>
      <div style={{ ...cellStyle, ...columnStyles.price }}>
        ₹{token.current_price.toLocaleString("en-IN")}
      </div>
      <div style={{ ...cellStyle, ...columnStyles.percentage }}>
        <span style={badgeStyle(token.price_change_percentage_24h > 0)}>
          {token.price_change_percentage_24h.toFixed(3)}%
        </span>
      </div>
      <div style={{ ...cellStyle, ...columnStyles.marketCap }}>
        ₹{token.market_cap.toLocaleString("en-IN")}
      </div>
      <div style={{ ...cellStyle, ...columnStyles.action }}>
        {userData ? (
          <WatchList token_id={token.id} isWatchlisted={token.iswatchlisted} />
        ) : (
          <WatchList token_id={false} isWatchlisted={token.iswatchlisted} />
        )}
      </div>
    </Link>
  );
};

export default TokenItemList;
