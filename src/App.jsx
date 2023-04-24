import React from 'react';
import './App.css';
import SearchForm from './components/searchForm/SearchForm';


import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <SearchForm></SearchForm>
      </div>
    </ThemeProvider>
  );
}

export default App;