import React from "react";
function Posts({ posts, loading }) {
  // if (loading) return <h2>Loading...</h2>;
  return (
    <ul className="posts-wrapper">
      {posts.map((post) => (
        <li key={post.id} onClick={()=>alert(post.id)}>
          <div className="title">{post.id} | {post.title}</div>
          <div className="content">{post.body}</div>
        </li>
      ))}
    </ul>
  );
}

export default Posts;
