import React,{useState,useEffect}from 'react';
import "./css/tagspop.css"
import { fetchTags } from './api';
const TagsPopup = ({
 
  handleRemoveTag,
  handleInputChange,
  handleInputKeyDown,
  inputValue,
  closeTagsPopup,
  suggestedTags,
  
}) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTagsData = async () => {
      try {
        const tagsData = await fetchTags();
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTagsData();
  }, []);
  return (
    <div className="tags-popup">
      <h4>Add Tags</h4>

      {/* Tags Table */}
      <table className="tags-table">
        <thead>
          <tr>
            <th>Tags Title</th>
          </tr>
        </thead>
        <tbody>
          {suggestedTags.map((tag, index) => (
            <tr key={index}>
              <td>{tag.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Input for Adding Tags */}
      <div className="tags-input-container">
        <input 
          type="text"
          placeholder="Add tags..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          list="suggestedTags"
        />
        <datalist id="suggestedTags">
          {suggestedTags.map((tag, index) => (
            <option key={index} value={tag.title} />
          ))}
        </datalist>
      </div>

      {/* Close Button */}
      <button type="button" onClick={closeTagsPopup}>
        Close
      </button>
    </div>
  );
};

export default TagsPopup;
