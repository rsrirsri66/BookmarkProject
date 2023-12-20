import React from 'react';

const TagsPopupstore = ({
  tags,
  handleRemoveTag,
  handleInputChange,
  handleInputKeyDown,
  inputValue,
  closeTagsPopup,
}) => {
  return (
    <div className="tags-popup">
      <h4>Add Tags</h4>
      <div className="tags-container">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <button
              type="button"
              className="close-btn"
              onClick={() => handleRemoveTag(tag)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Add tags..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <button type="button" onClick={closeTagsPopup}>
        Close
      </button>
    </div>
  );
};

export default TagsPopupstore;
