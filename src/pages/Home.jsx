import React from "react";
import { Link } from "react-router-dom";
import homeStore from "../stores/homeStore";
import Header from "../components/Header";
import ListItem from "../components/ListItem";

export default function Home() {
  const store = homeStore();

  React.useEffect(() => {
    store.fetchCoins();
  }, []);

  return (
    <div>
      <Header />
      <div className="item-list">
        <div className="home-cryptos">
          {store.coins.map((coin) => {
            return (
              <div key={coin.id} className="crypto-container">
                <ListItem key={coin.id} coin={coin} />{" "}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
