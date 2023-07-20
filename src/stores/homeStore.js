import axios from "axios";
import { create } from "zustand";
import debounce from "../helpers/debounce";

const homeStore = create((set) => ({
  coins: [],
  trending: [],
  query: "",

  setQuery: (e) => {
    set({ query: e.target.value });
    homeStore.getState().searchCoins();
  },

  searchCoins: debounce(async () => {
    const { query, coins } = homeStore.getState();
    if (query.length > 2) {
      const searchRes = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      console.log(searchRes);

      const names = [];
      searchRes.data.coins.forEach((Element) => {
        names.push(Element.id);
      });

      const coins = searchRes.data.coins.map((coin) => {
        return {
          name: coin.name,
          image: coin.large,
          id: coin.id,
        };
      });
      set({ coins });
      console.log("ds", coins);
    } else {
      set({ coins: coins });
    }
  }, 500),

  fetchCoins: async () => {
    const [res, btcRes] = await Promise.all([
      axios.get("https://api.coingecko.com/api/v3/search/trending"),
      axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      ),
    ]);

    const btcPrice = btcRes.data.bitcoin.usd;

    console.log(btcPrice);
    const coins = res.data.coins.map((coin) => {
      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        priceBtc: coin.item.price_btc.toFixed(10),
        priceUSD: (coin.item.price_btc * btcPrice).toFixed(6),
      };
    });
    set({ coins, trending: coins });
  },
}));

export default homeStore;
