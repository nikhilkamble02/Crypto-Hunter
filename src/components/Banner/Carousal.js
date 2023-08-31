import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../../config/api';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom'

const CarousalStyle = styled('div')({
  height: '50%',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden'

});

export function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const Carousal = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {

      const apiUrl = TrendingCoins(currency);
            const { data } = await axios.get(apiUrl);
            // setCoins(data);
      // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      // const apiUrl = TrendingCoins(currency);
      // const { data } = await axios.get(proxyUrl + apiUrl);

      setTrending(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(trending);

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link
        key={coin.id}
        to={`/coins/${coin.id}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          textTransform: 'uppercase',
          color: 'white'
        }}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>{coin?.symbol}
          &nbsp;
          <span style={{
            color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
            fontWeight:500,
          }}>
            {profit && '+'}{coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });


  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  }

  return (
    <CarousalStyle>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
       disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </CarousalStyle>
  );
};

export default Carousal;
