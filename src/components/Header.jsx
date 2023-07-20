import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import homeStore from "../stores/homeStore";

export default function Header({ back }) {
  const store = homeStore();

  return (
    <header className="grid">
      {" "}
      <div className="grid-head grid-item-1">
        {back && (
          <Link to="/">
            <AiOutlineLeft className="grid-icon-1" />
          </Link>
        )}
      </div>
      <div className="grid-head grid-item-2">
        <Link to="/">Coiner!</Link>
      </div>
      {!back && (
        <div className="grid-search grid-item-4">
          {" "}
          Search Coin
          <input
            className="searchBar"
            type="text"
            value={store.query}
            onChange={store.setQuery}
          />
        </div>
      )}
    </header>
  );
}
