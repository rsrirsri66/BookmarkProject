
import React from 'react';

const TagsPopup = ({ tags, handleRemoveTag, handleInputChange, handleInputKeyDown, inputValue, closeTagsPopup }) => {
  return (
    <div className='tags-popup'>
      <h4>Tags Popup</h4>
      <div className='mb-3'>
        <label htmlFor='tags' className='form-label'>
          Tags
        </label>
        <div className='tags-input'>
          <div className='tags-container'>
            {tags.map((tag, index) => (
              <div key={index} className='tag'>
                {tag}
                <button
                  type='button'
                  className='close-btn'
                  onClick={() => handleRemoveTag(tag)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <input
            type='text'
            placeholder='Add tags...'
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
        </div>
      </div>
      <button onClick={closeTagsPopup}>Close</button>
    </div>
  );
};

export default TagsPopup;
