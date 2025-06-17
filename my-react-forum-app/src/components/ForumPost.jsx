import React from "react";
import { Card } from "antd";

const ForumPost = ({ post }) => {
  return (
    <Card title={post.title} style={{ margin: "16px 0" }}>
      <p>{post.content}</p>
      <p className="text-gray-500">Posted by: {post.author}</p>
      <p className="text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
    </Card>
  );
};

export default ForumPost;