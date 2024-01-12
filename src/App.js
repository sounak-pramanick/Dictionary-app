import './App.css';
import { Container } from '@mui/material';
import Header from './components/Header/Header';
import { useEffect, useState } from 'react';

function App() {
  const [word, setWord] = useState('');
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState('en');

  const dictionaryApi = async () => {
    try {
      const data = await fetch(
        'https://api.dictionaryapi.dev/api/v2/entries/en/plane'
      );
      const resp = await data.json();
      console.log(resp);
      setMeanings(resp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dictionaryApi();
  }, []);

  return (
    <div className="appContainer">
      <Container maxWidth="md">
        <Header
          word={word}
          setWord={setWord}
          category={category}
          setCategory={setCategory}
        />
      </Container>
    </div>
  );
}

export default App;
