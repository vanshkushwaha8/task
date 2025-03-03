import React, { useState } from 'react';
import { FaUser, FaHome, FaPlay, FaUserFriends, FaStore, FaBell, FaEllipsisH, FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [postData, setPostData] = useState({ name: '', description: '', image: null });
  const [editingPost, setEditingPost] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setPostData({ ...postData, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handlePost = () => {
    if (editingPost !== null) {
      const updatedPosts = [...posts];
      updatedPosts[editingPost] = postData;
      setPosts(updatedPosts);
      setEditingPost(null);
    } else {
      setPosts([...posts, postData]);
    }
    setPostData({ name: '', description: '', image: null });
    setShowPopup(false);
  };

  const handleEdit = (index) => {
    setPostData(posts[index]);
    setEditingPost(index);
    setShowPopup(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="homepage-container">
      

      

        <div className="news-feed">
          <button className="post-button" onClick={() => setShowPopup(true)}>Post</button>
          {posts.map((post, index) => (
            <div key={index} className="post-card">
              <div className="post-header">
                <span>{post.name}</span>
                <FaEllipsisH className="post-options" onClick={() => handleEdit(index)} />
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
              <p>{post.description}</p>
              {post.image && <img src={post.image} alt="Post" className="post-image" />}
              <div className="post-actions">
                <FaThumbsUp /> <FaComment /> <FaShare />
              </div>
            </div>
          ))}
        </div>

        
     

      {showPopup && (
        <div className="post-popup">
          <input type="text" name="name" placeholder="Name" value={postData.name} onChange={handleInputChange} />
          <textarea name="description" placeholder="Description" value={postData.description} onChange={handleInputChange} />
          <input type="file" onChange={handleImageUpload} />
          <button onClick={handlePost}>{editingPost !== null ? 'Update' : 'Upload'}</button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
