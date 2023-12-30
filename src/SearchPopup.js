import React, { useState } from 'react';
import './css/searchpopup.css'

const SearchPopup = ({ closeSearchPopup, bookmarks, setHighlightedIndex }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [dataNotFound, setDataNotFound] = useState(false);

  const handleSearch = () => {
    // Perform search based on the search query
    const results = bookmarks.filter((bookmark) => {
      const includesInUrl = bookmark.url && bookmark.url.includes(searchQuery);
      const includesInTitle = bookmark.title && bookmark.title.includes(searchQuery);
      const includesInTags = bookmark.tags && bookmark.tags.includes(searchQuery);
  
      return includesInUrl || includesInTitle || includesInTags;
    });
  
    setSearchResults(results);
    setDataNotFound(results.length === 0);
  };

  return (
    <div className="search-popup">
      <h4>Search Bookmarks</h4>
      <input
        type="text"
        placeholder="Enter to search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch} className='searchbutton' >Search</button>
      <button onClick={closeSearchPopup} className='searchbutton'>Close</button>
      {dataNotFound ? (
        <p className="no-results-message">No results found.</p>
      ) : (
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <p>{result.title}</p>
            <p>{result.url}</p>
            <p>{result.description}</p>
           <p>{result.tag_title}</p>
           {console.log('tags:',result)}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default SearchPopup;