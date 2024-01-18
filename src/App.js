import './App.css';
import axios from 'axios';
import { Container, Switch, alpha, styled } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import Header from './components/Header/Header';
import WordSearch from './components/WordSearch/WordSearch';
import { grey } from '@mui/material/colors';

function App() {
  const [word, setWord] = useState('');
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const controllerRef = useRef(null);

  const dictionaryApi = async () => {
    try {
      if (controllerRef.current) controllerRef.current.abort();
      controllerRef.current = new AbortController();

      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`,
        { signal: controllerRef.current.signal }
      );
      // console.log(data);
      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const ThemeSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: grey[600],
      '&:hover': {
        backgroundColor: alpha(grey[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: grey[600],
    },
  }));

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    dictionaryApi();
    // eslint-disable-next-line
  }, [word, category]);

  return (
    <div className={`appContainer ${isDarkMode ? 'darkMode' : 'lightMode'}`}>
      <Container
        maxWidth="md"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          height: '100vh',
        }}
      >
        <div className="themeToggle">
          <span>{isDarkMode ? 'Light' : 'Dark'} Mode</span>
          <ThemeSwitch checked={isDarkMode} onChange={toggleTheme} />
        </div>
        <Header
          word={word}
          setWord={setWord}
          category={category}
          setCategory={setCategory}
          isDarkMode={isDarkMode}
        />
        {meanings && (
          <WordSearch word={word} meanings={meanings} isDarkMode={isDarkMode} />
        )}
      </Container>
    </div>
  );
}

export default App;
