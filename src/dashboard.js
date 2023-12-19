import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/dashboard.css'
import TagsPopup from './tags';
const Dash = () => {
  const [url, seturl]= useState('');
  const [title, settitle]=useState('');
  const [description,setdescription]=useState('');
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);
  const [bookmarks, setBookmarks] = useState([]); 
  const [isTagsPopupVisible, setTagsPopupVisible] = useState(false);
  const handleDeleteBookmark = (index) => {
    // Create a copy of the current bookmarks array
    const updatedBookmarks = [...bookmarks];
    // Remove the bookmark at the specified index
    updatedBookmarks.splice(index, 1);
    // Update the state with the new bookmarks array
    setBookmarks(updatedBookmarks);
  };
  const handleEditBookmark = (index) => {
    // Assuming you want to edit the bookmark in a form within the same component
    const bookmarkToEdit = bookmarks[index];
    // Set the form fields with the data of the bookmark to be edited
    seturl(bookmarkToEdit.url);
    settitle(bookmarkToEdit.title);
    setdescription(bookmarkToEdit.description);
    setTags(bookmarkToEdit.tags || []); // Ensure tags is an array
    // Show the form by setting isFormVisible to true
    setFormVisible(true);
    // Optionally, you can remove the edited bookmark from the list
    handleDeleteBookmark(index);
  };
  const handleShareBookmark = (index) => {
    // Assuming you want to share the bookmark in a modal or perform some sharing functionality
    const bookmarkToShare = bookmarks[index];
    // Display a modal or perform sharing functionality based on the bookmarkToShare data
    console.log(`Share bookmark at index ${index}`, bookmarkToShare);
  };


  const toggleTagsPopupVisibility = () => {
    setTagsPopupVisible(!isTagsPopupVisible);
  };
  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('http://localhost:6002/book')
      .then((response) => {
        setBookmarks(response.data); // Assuming the API response is an array of bookmarks
      })
      .catch((error) => {
        console.error('Error fetching bookmarks:', error);
      });
  }, []);
  
  const handleAddBookmark=()=>{
     // Create a new bookmark object
     const newBookmark = { url, title, description, tags };
      // Update the bookmarks state with the new bookmark
     setBookmarks([...bookmarks, newBookmark]);
      // Clear the form after adding the bookmark 
      seturl('');
      settitle('');
      setdescription('');
      setTags([]);
      setFormVisible(false);
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };
    return (
    <div>
    <div className='book'>
      <title>Booking</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
      <link rel="stylesheet" href="style.css" />
      <center><h3 className='mybook'><b>My Bookmarks</b></h3></center>
      
      <div className='tabular' style={{ color: 'rgb(201, 131, 1)' }}>
        <ul>
          {/* Use a button to toggle the form visibility */}
          <button 
            style={{ color: 'rgb(201, 131, 1)' }}
            onClick={toggleFormVisibility}
          > 
            <li>Add bookmarks</li>
          </button>
          <a href="# " style={{ color: 'rgb(201, 131, 1)' }} onClick={(e) => { e.preventDefault(); toggleTagsPopupVisibility(); }}>
  <li>Tags</li>
</a>

          <a href="snack.html" style={{ color: 'rgb(201, 131, 1)' }} target="_blank"><li>About us</li></a>
          <a href="/register" style={{ color: 'rgb(201, 131, 1)' }}><li>Logout</li></a>
        </ul>
      </div>
      {isFormVisible && (
        <div className='add-bookmark-form'>
          <h4 className='newbook'>Add New Bookmark</h4>
      <form className='addbm'>
        <div className='mb-3'>
        <label htmlFor="url" className="form-label">
              URL
            </label>
            <input
              type="text"
              className="form-control"
              id="url"
              value={url}
              onChange={(e) => seturl(e.target.value)}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
          </div>
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
          <button type="button" className="btn btn-primary"  onClick={handleAddBookmark}>
            Add Bookmark
          </button>

      </form>
      </div>
      )}
    </div>  
    <div className='existing'>
  {/* Display the list of bookmarks as a table */}
  <table className="table">
    <thead>
      <tr>
        <th>Title</th>
        <th>URL</th>
        <th>Tags</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {bookmarks.map((bookmark, index) => (
        <tr key={index}>
          <td>{bookmark.title}</td>
          <td>
            <input
              type="text"
              readOnly
              value={bookmark.url}
              onClick={() => window.open(bookmark.url, '_blank')}
            />
          </td>
          <td>{bookmark.tags ? bookmark.tags.join(', ') : 'No tags'}</td>
          <td>{bookmark.description}</td>
          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteBookmark(index)} // Assuming you have a function for handling delete
            >
              Delete
            </button>
            <button
              className="btn btn-info btn-sm"
              onClick={() => handleEditBookmark(index)} // Assuming you have a function for handling edit
            >
              Edit
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleShareBookmark(index)} // Assuming you have a function for handling share
            >
              Share
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

       {/* Conditionally render TagsPopup based on state */}
       {isTagsPopupVisible && (
        <TagsPopup
          tags={tags}
          handleRemoveTag={handleRemoveTag}
          handleInputChange={handleInputChange}
          handleInputKeyDown={handleInputKeyDown}
          inputValue={inputValue}
          closeTagsPopup={toggleTagsPopupVisibility}
        />
      )}
    </div>
  );
};

export default Dash;
