import React from 'react';
import './WordSearch.css';

const WordSearch = ({ word, meanings, isDarkMode }) => {
  return (
    <div className="wordDefinitionsContainer">
      {word === '' ? (
        <span className="emptyTitle">Type a word to search</span>
      ) : (
        meanings.map((meaning) =>
          meaning.meanings.map((mean) =>
            mean.definitions.map((def, index) => (
              <div
                key={index}
                className={`singleMeaning ${
                  isDarkMode ? 'darkModeMeaning' : 'lightModeMeaning'
                }`}
              >
                <b>Meaning: </b>
                {def.definition}
                <hr />
                {def.example && (
                  <>
                    <span>
                      <b>Example: </b>
                      {def.example}
                    </span>
                    <hr />
                  </>
                )}
                {def.synonyms && def.synonyms[0] && (
                  <span>
                    <b>Synonyms: </b>
                    {def.synonyms.map((s) => `${s}`)}
                  </span>
                )}
              </div>
            ))
          )
        )
      )}
    </div>
  );
};

export default WordSearch;
