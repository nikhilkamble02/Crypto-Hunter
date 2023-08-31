
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import {styled } from '@mui/system';

const AppRoot = styled('div')({
  backgroundColor: '#14161a',
  color: "white",
  minHeight: "100vh"
});

function App() {
  
  return (
    <BrowserRouter>
      <AppRoot>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </AppRoot>
    </BrowserRouter>

  );
}

export default App;
