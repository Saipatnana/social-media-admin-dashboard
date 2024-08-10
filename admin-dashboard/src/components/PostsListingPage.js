import React, { useContext, useState, useEffect } from 'react';
import { posts as initialPosts } from '../data/dummyData';
import KPIBox from './KPIBox';
import Pagination from './Pagination';
import { AuthContext } from '../context/AuthContext';

const PostsListingPage = () => {
  const { setPostCount,setRecentPostsCount,recentPostsCount } = useContext(AuthContext);
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState({ caption: '', media_url: '' });

  useEffect(() => {
    setPostCount(posts.length);
  }, [posts, setPostCount]);

  const totalPosts = posts.length;

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddPost = () => {
    const postId = posts.length + 1; // Example: increment post ID
    setPosts([...posts, { post_id: postId, ...newPost }]);
    setNewPost({ caption: '', media_url: '' }); // Reset form
    setRecentPostsCount(recentPostsCount+1)
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.post_id !== postId));
  };

  const handleHidePost = (postId) => {
    handleDeletePost(postId); // Temporarily remove post
    // Optionally, implement functionality to restore hidden posts.
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Posts Listing</h2>
      <div className="flex space-x-4 mb-4">
        <KPIBox title="Total Posts" value={totalPosts} />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Caption"
          value={newPost.caption}
          onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
          className="border rounded p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Media URL"
          value={newPost.media_url}
          onChange={(e) => setNewPost({ ...newPost, media_url: e.target.value })}
          className="border rounded p-2 mr-2"
        />
        <button
          onClick={handleAddPost}
          className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-400"
        >
          Add Post
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Post ID</th>
              <th className="p-2 border">Caption</th>
              <th className="p-2 border">Media URL</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map(post => (
              <tr key={post.post_id} className="hover:bg-gray-100">
                <td className="p-2 border">{post.post_id}</td>
                <td className="p-2 border">{post.caption}</td>
                <td className="p-2 border">{post.media_url}</td>
                <td className="p-2 border flex items-center justify-center">
                  <button
                    onClick={() => handleDeletePost(post.post_id)}
                    className="bg-red-500 text-white py-1 px-3 mr-4 rounded hover:bg-red-400"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleHidePost(post.post_id)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-400"
                  >
                    Hide
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        itemsPerPage={postsPerPage}
        totalItems={totalPosts}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default PostsListingPage;
