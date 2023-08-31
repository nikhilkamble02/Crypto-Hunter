import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import styled from '@emotion/styled';
import CoinInfo from '../components/CoinInfo';
import { useTheme } from '@mui/material/styles';
import { LinearProgress, Typography } from '@mui/material';
import { numberWithCommas } from '../components/Banner/Carousal';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchSingleCoin = async () => {
    try {

      const apiUrl =SingleCoin(id);
      const { data } = await axios.get( apiUrl);
      // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      // const apiUrl =SingleCoin(id);
      // const { data } = await axios.get(proxyUrl + apiUrl);


      // const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(coin);

  useEffect(() => {
    fetchSingleCoin();
  }, []);

  const theme = useTheme();

  const ContainerStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

  const SidebarStyle = styled('div')({
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    borderRight: '2px solid grey',
  });

  const MarketData = styled('div')({
    alignSelf: 'start',
    padding: 25,
    paddingTop: 10,
    width: "100%",
    // responsive 
    [theme.breakpoints.down("md")]: {
      display: 'flex',
      justifyContent: "space-around"
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: 'center'
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: 'start'
    },

  })

  if (!coin) return <LinearProgress style={{ backgroundColor: 'gold' }} />

  return (
    <ContainerStyle theme={theme}>
      <SidebarStyle>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant='h3' style={{
          fontWeight: 'bold',
          marginBottom: 20,
          fontFamily: 'Montserrat'
        }}>
          {coin?.name}
        </Typography>
        {/* <div  */}
        <Typography variant='subtitle1'
          style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify"
          }}

          dangerouslySetInnerHTML={{
            __html: coin?.description?.en?.split('. ')[0] || '',
          }}>
        </Typography>

        {/* /> */}
        <MarketData>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' style={{
              fontWeight: 'bold',
              marginBottom: 20,
              fontFamily: 'Montserrat'
            }}>
              Rank :
            </Typography >
            &nbsp; &nbsp;
            <Typography variant='h5'
              style={{
                fontFamily: "montserrat"
              }}>
              {coin?.market_cap_rank}

            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' style={{
              fontWeight: 'bold',
              marginBottom: 20,
              fontFamily: 'Montserrat'
            }}>
              Market Price :
            </Typography >
            &nbsp; &nbsp;
            <Typography variant='h5'
              style={{
                fontFamily: "montserrat"
              }}>
              {/* {coin?.market_cap_rank} */}
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}

            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' style={{
              fontWeight: 'bold',
              marginBottom: 20,
              fontFamily: 'Montserrat'
            }}>
              Market Cap :
            </Typography >
            &nbsp; &nbsp;
            <Typography variant='h5'
              style={{
                fontFamily: "montserrat"
              }}>
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M


            </Typography>
          </span>

        </MarketData>
      </SidebarStyle>
      {/* chart  */}
       
      <CoinInfo coin={coin} />
    </ContainerStyle>
  );
};

export default CoinPage;
