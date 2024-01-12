import { MenuItem, TextField, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import './Header.css';
import categories from '../../data/languageCategory';

const Header = ({ word, setWord, category, setCategory }) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      mode: 'dark',
    },
  });

  const handleSearch = (e) => {
    setWord(e.target.value);
  };

  const handleLanguageChange = (language) => {
    setCategory(language);
    setWord('');
  };

  return (
    <div className="header">
      <span className="title">{word ? word : 'Word Guide'}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            label="Search a word"
            variant="standard"
            className="search"
            value={word}
            onChange={handleSearch}
          />

          <TextField
            select
            label="Select Language"
            className="select"
            defaultValue="en"
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.label}>
                {category.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
