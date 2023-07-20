import React from "react";
import { Link } from "react-router-dom";

export default function ListItem({ coin, priceBtc }) {
  if (!coin) return <></>;

  return (
    <>
      <Link to={`/${coin.id}`}>{coin.name}</Link>
      {/* {coin.priceUSD.length.toFixed(2)} */}
      {/* {console.log(coin)} */}
      <span>
        {coin.priceBtc} {coin.priceUSD} = USD
      </span>
      <div className="list-coin-image">
        {" "}
        <img src={coin.image} alt="" />
      </div>
    </>
  );
}
