import { Container, ThemeProvider } from '@mui/system';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';


const CoinInfo = ({ coin }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      const currencyName = coin.id;
      const url = `https://bing-news-search1.p.rapidapi.com/news/search?q=${currencyName}&freshness=Week&textFormat=Raw&safeSearch=Off`;
      const options = {
        method: 'GET',
        headers: {
          'X-BingApis-SDK': 'true',
          'X-RapidAPI-Key': 'f533ed1942msh1fa338c170623bfp1100f0jsnb14a5541d441',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
console.log(result.value[0])
        if (result.value.length > 0) {
          setArticles(result.value);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNewsData();
  }, [coin.id]);

  // Function to format date and time
  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  };
  

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#fff'
      }
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      


      <div style={{
        margin: "2rem",
        width: "75%",
        '@media screen and (max-width: 600px)': {
          // margin: ".2rem",
          width: "100%"
        }

      }}><Typography variant='h3' fontFamily="Montserrat" textAlign="center">Latest News of {coin.name}</Typography>
        {articles.map((article, index) => (
          <Card key={index} sx={{
            display: 'flex', marginBottom: '16px',
            fontFamily: "Montserrat",

            '@media (min-width:600px)': {
              width: '100%',
              margin: "1rem"
            },
            '@media (max-width:600px)': {
              flexDirection: "column"
            },
          }}>
            
            {article.image?.thumbnail?.contentUrl && (
              <CardMedia
                component="img"
                sx={{
                  width: 150, height: 100, objectFit: 'cover', borderRadius: '8px',
                  '@media (max-width:600px)': {
                    width: '100%', // Make the image take full width
                    height: 'auto',
                  },
                }}
                image={article.image.thumbnail.contentUrl}
                alt="News Thumbnail"
              />
            )}
            <CardContent sx={{}}>
              <Typography style={{ fontFamily: "Montserrat", opacity:.8 }} variant="h5"   component="h2" gutterBottom>
                {article.name}
              </Typography>
              <Typography style={{ fontFamily: "Montserrat" }} variant="body2" color="text.secondary">
                {article.description}
              </Typography>
              <Typography style={{ fontFamily: "Montserrat", fontWeight:"" , color:"white"}} variant="outlined" color="text.secondary" sx={{ marginTop: '8px' }}>
                Published On : {formatDateTime(article.datePublished)}
              </Typography>
              <Link target='_blank' to={article.url} variant="body2" color="primary">
                Read More
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </ThemeProvider>
  );
};
export default CoinInfo;
