import React from 'react';



function SearchResult({ list }) {
  return (
    <div>
      <ul>
        {Array.isArray(list) && list.map(item => {
          return <li key={item.id}>{item.title}</li>
        })}
      </ul>

    </div>
  );
}

export default SearchResult;
