


import React from 'react';
import { AppBar, CssBaseline, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { Container, ThemeProvider, fontSize } from '@mui/system';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff'
    }
  }
});
const HeaderStyle = styled('div')({
  flex: 1,
  color: 'gold',
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: "2rem",
  position: 'relative',
  left: 5,
});

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();
  console.log(currency)
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography variant='h6' onClick={() => navigate('/')}>
              <HeaderStyle > Crypto Hunter</HeaderStyle>
            </Typography>
            <Select
              variant='outlined'
              style={{
                width: 100,
                height: 40,
                position: 'absolute',
                right: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
