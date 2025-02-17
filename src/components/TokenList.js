import React, { useContext, useState } from "react";
import UserContext from "../context/userContext";
import TokenItemList from "./TokenItemList";
import TokenContext from "../context/tokenContext";

const TokenList = ({ tokenList, watchlisted }) => {
  const { userData } = useContext(UserContext);
  const { tokens } = useContext(TokenContext);

  const containerStyle = {
    maxWidth: "1120px",
    margin: "1rem auto",
    padding: "0 1rem",
  };

  const tableContainerStyle = {
    border: "1px solid var(--text_color)",
    borderRadius: "0.5rem",
    overflowX: "auto",
  };

  const tableStyle = {
    width: "100%",
  };

  const tableHeaderCellStyle = {
    borderBottom: "1px solid var(--text_color)",
    padding: "1rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "var(--text_color)",
    textAlign: "left",
    paddingLeft: "1.5rem",
  };

  const watchListEmptyStyle = {
    textAlign: "center",
    padding: "2rem 0",
    color: "#e4e4e7",
  };

  const columnStyles = {
    rank: { width: "10%" },
    name: {
      width: "30%",
      position: "sticky",
      left: "0",
      zIndex: "1",
      background: "var(--bg_color)",
    },
    price: {
      width: "20%",
      position: "sticky",
      left: "0",
      zIndex: "1",
      background: "var(--bg_color)",
    },
    percentage: {
      width: "20%",
      position: "sticky",
      left: "0",
      zIndex: "1",
      background: "var(--bg_color)",
    },
    marketCap: {
      width: "20%",
      position: "sticky",
      left: "0",
      zIndex: "1",
      background: "var(--bg_color)",
    },
    action: {
      width: "10%",
      position: "sticky",
      left: "0",
      zIndex: "1",
      background: "var(--bg_color)",
    },
  };

  return (
    <>
      {tokenList && tokenList.length !== 0 ? (
        <div style={containerStyle}>
          <div style={tableContainerStyle}>
            <div style={tableHeaderCellStyle}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ ...tableHeaderCellStyle, ...columnStyles.rank }}>
                  #
                </div>
                <div style={{ ...tableHeaderCellStyle, ...columnStyles.name }}>
                  Name
                </div>
                <div style={{ ...tableHeaderCellStyle, ...columnStyles.price }}>
                  Price
                </div>
                <div
                  style={{
                    ...tableHeaderCellStyle,
                    ...columnStyles.percentage,
                  }}
                >
                  24h %
                </div>
                <div
                  style={{ ...tableHeaderCellStyle, ...columnStyles.marketCap }}
                >
                  Market Cap
                </div>
                <div
                  style={{ ...tableHeaderCellStyle, ...columnStyles.action }}
                >
                  Action
                </div>
              </div>

              <div style={{ display: "table-row-group" }}>
                {tokenList.map((token) => (
                  <TokenItemList
                    token={token}
                    userData={userData}
                    key={token.id}
                    columnStyles={columnStyles} // Pass column styles to rows
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        watchlisted && (
          <div style={containerStyle}>
            <p style={watchListEmptyStyle}>Your Watch List is empty.</p>
          </div>
        )
      )}
    </>
  );
};

export default TokenList;
