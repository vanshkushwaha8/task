import React, { useEffect, useState } from 'react';
import { FaUser, FaHome, FaPlay, FaUserFriends, FaStore, FaBell, FaEllipsisH, FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';
import './HomePage.css';

// Add time formatting utility
const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const postDate = new Date(timestamp);
  const diff = now - postDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (days > 0) return rtf.format(-days, 'day');
  if (hours > 0) return rtf.format(-hours, 'hour');
  if (minutes > 0) return rtf.format(-minutes, 'minute');
  return rtf.format(-seconds, 'second');
};

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [postData, setPostData] = useState({ 
    name: '', 
    description: '', 
    image: null,
    createdAt: new Date().toISOString() 
  });
  const [editingPost, setEditingPost] = useState(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [timeAgo, setTimeAgo] = useState(0); // For auto-updating timestamps

  // Add auto-update interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(prev => prev + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Keep existing useEffect for click outside

//   const handlePost = () => {
//     if (editingPost !== null) {
//       const updatedPosts = [...posts];
//       updatedPosts[editingPost] = {
//         ...postData,
//         createdAt: posts[editingPost].createdAt // Preserve original timestamp
//       };
//       setPosts(updatedPosts);
//       setEditingPost(null);
//     } else {
//       setPosts([...posts, {
//         ...postData,
//         createdAt: new Date().toISOString()
//       }]);
//     }
//     setPostData({ name: '', description: '', image: null, createdAt: new Date().toISOString() });
//     setShowPopup(false);
//   };

  const PostCard = ({ post, index }) => (
    <div className="post-card card">
      <div className="post-header">
        <div className="author-info">
          <img src={user.profilePic} alt="Profile" className="author-img" />
          <div>
            <span className="author-name">{post.name}</span>
            <span className="post-time">
              {formatTimeAgo(post.createdAt)}
            </span>
          </div>
        </div>
        <div className="post-controls">
          <FaEllipsisH 
            className="icon" 
            onClick={() => setActiveMenuIndex(activeMenuIndex === index ? null : index)} 
          />
          {activeMenuIndex === index && (
            <div className="post-menu">
              <button onClick={() => {
                handleEdit(index);
                setActiveMenuIndex(null);
              }}>
                Edit
              </button>
              <button onClick={() => {
                setPostToDelete(index);
                setShowDeleteConfirm(true);
                setActiveMenuIndex(null);
              }}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="post-content">{post.description}</p>
      {post.image && <img src={post.image} alt="Post" className="post-image" />}
      <div className="post-interactions">
        <button className="interaction-btn">
          <FaThumbsUp /> Like
        </button>
        <button className="interaction-btn">
          <FaComment /> Comment
        </button>
        <button className="interaction-btn">
          <FaShare /> Share
        </button>
      </div>
    </div>
  );
  const confirmDelete = () => {
    setPosts(posts.filter((_, i) => i !== postToDelete));
    setShowDeleteConfirm(false);
    setPostToDelete(null);
  };

  const DeleteConfirmation = () => (
    <div className="confirmation-overlay">
      <div className="confirmation-modal card">
        <h3>Delete Post?</h3>
        <p>Are you sure you want to delete this post?</p>
        <div className="confirmation-actions">
          <button className="secondary-btn" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </button>
          <button className="primary-btn" onClick={confirmDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );

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
      updatedPosts[editingPost] = {
        ...postData,
        createdAt: posts[editingPost].createdAt // Preserve original timestamp
      };
      setPosts(updatedPosts);
      setEditingPost(null);
    } else {
      setPosts([...posts, {
        ...postData,
        createdAt: new Date().toISOString()
      }]);
    }
    setPostData({ name: '', description: '', image: null, createdAt: new Date().toISOString() });
    setShowPopup(false);
  };

  const handleEdit = (index) => {
    setPostData(posts[index]);
    setEditingPost(index);
    setShowPopup(true);
  };

  const user = {
    name: 'Vansh Kushwaha',
    profilePic: 'https://via.placeholder.com/40',
  };

  const navigationItems = [
    { icon: <FaHome />, name: 'Home' },
    { icon: <FaUserFriends />, name: 'Friends' },
    { icon: <FaPlay />, name: 'Videos' },
    { icon: <FaStore />, name: 'Marketplace' },
  ];

  return (
    <div className="facebook-container">
      {showDeleteConfirm && <DeleteConfirmation />}
      <header className="top-bar">
        <div className="logo">facebook</div>
        <div className="search-container">
          <input type="text" className="search-bar" placeholder="Search Facebook" />
        </div>
        <nav className="main-nav">
          {navigationItems.map((item, index) => (
            <div key={index} className="nav-item">
              {item.icon}
              <span className="nav-text">{item.name}</span>
            </div>
          ))}
        </nav>
        <div className="user-actions">
          <FaBell className="icon" />
          <img src={user.profilePic} alt="Profile" className="profile-pic" />
        </div>
      </header>

      <main className="main-content">
        <aside className="left-sidebar">
          <div className="user-profile">
            <img src={user.profilePic} alt="Profile" className="user-img" />
            <h3>{user.name}</h3>
          </div>
          <ul className="sidebar-menu">
            {navigationItems.map((item, index) => (
              <li key={index} className="menu-item">
                {item.icon}
                <span className="menu-text">{item.name}</span>
              </li>
            ))}
          </ul>
        </aside>

        <section className="news-feed">
          <div className="create-post card">
            <div className="post-input">
              <img src={user.profilePic} alt="Profile" className="user-thumb" />
              <textarea placeholder="What's on your mind, John?" />
            </div>
            <div className="post-actions">
              <button className="post-button" onClick={() => setShowPopup(true)}>
                Post
              </button>
            </div>
          </div>

          {posts.map((post, index) => (
            <PostCard key={index} post={post} index={index} />
          ))}
        </section>

        <aside className="right-sidebar">
          <h4 className="sidebar-title">Sponsored</h4>
          <div className="ad-card card">
            <img src="https://via.placeholder.com/150" alt="Ad" className="ad-image" />
            <div className="ad-content">
              <p className="ad-title">Check out this amazing product!</p>
              <span className="ad-subtitle">sponsored.com</span>
            </div>
          </div>
        </aside>
      </main>

      {showPopup && (
        <div className="post-popup-overlay">
          <div className="post-popup card">
            <h2>{editingPost !== null ? 'Edit Post' : 'Create Post'}</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={postData.name}
              onChange={handleInputChange}
              className="form-input"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={postData.description}
              onChange={handleInputChange}
              className="form-textarea"
            />
            <label className="file-upload">
              <input type="file" onChange={handleImageUpload} />
              Upload Image
            </label>
            <div className="popup-actions">
              <button className="secondary-btn" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
              <button className="primary-btn" onClick={handlePost}>
                {editingPost !== null ? 'Update' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;