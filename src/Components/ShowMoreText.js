import React, { useState } from 'react';
import './work.scss'

const ShowMoreText = ({ text, maxLength = 100 }) => {
  const [showFullText, setShowFullText] = useState(false);
  const toggleShowMore = () => {
    setShowFullText(!showFullText);
  };

  if (text.length <= maxLength) {
    return <p>{text}</p>;
  }

  const displayedText = showFullText ? text : `${text.substring(0, maxLength)}...`;

  return (
    <div>
      <p>{displayedText}</p>
      <a onClick={toggleShowMore} class="show-more-link">
        {showFullText ? 'Show Less' : 'Show More'}
      </a>
    </div>
  );
};

export default ShowMoreText;