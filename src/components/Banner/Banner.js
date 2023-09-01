import React from 'react'
import styled from '@emotion/styled';
import { Container, color } from '@mui/system';
import { Typography } from '@mui/material';
import Carousal from './Carousal';
import { red } from '@mui/material/colors';

const BannerStyle = styled('div')({
  backgroundImage: "url(./banner2.jpg)",
  // backgroundImage: "url(./abstract-technological-background_23-2148897676.avif)",
  // backgroundRepeat:'no-repeat',
  // backgroundPosition:'center',
  // backgroundSize:'100%'
  
  // backgroundColor:'black'
});
const BannerContent = styled('div')({
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 25,
  justifyContent: 'space-around'
});
const TagLine = styled('div')({
  display: 'flex',
  height: '40%',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center'
});

const Banner = () => {
  return (
    <BannerStyle>
      <Container>
        <BannerContent>
          <TagLine>
            <Typography variant='h2'
              style={{
                fontWeight: 'bold',
                marginBottom: 15,
                fontFamily: 'Montserrat'
              }}>
              Crypto Hunter by Nikhil
            </Typography>
            <Typography
              variant='subtitle2'
              style={{
                color: 'darkgray',
                textTransform: "capitalize",
                fontFamily: 'Montserrat'
              }}>
              Get All The Info Regarding Your Favourite Crypto Currency
              <br/>
              <span style={{
                // color: 'darkgray',
                fontWeight:'bold',
                textTransform: "capitalize",
                fontFamily: 'Montserrat'
              }}>Top 10 Trending Currencies</span>
            </Typography>
            {/* <Typography>/Typography> */}
          </TagLine>
          <Carousal />
        </BannerContent>
      </Container>

    </BannerStyle>
  )


}

export default Banner
