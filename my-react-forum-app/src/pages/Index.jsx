import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd"; // Importing Ant Design Button

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Forum</h1>
      <p className="text-lg mb-8">Join the discussion and share your thoughts!</p>
      <Link to="/foro">
        <Button type="primary" size="large">
          Go to Forum
        </Button>
      </Link>
      <Link to="/login" className="mt-4">
        <Button type="default" size="large">
          Login
        </Button>
      </Link>
    </div>
  );
};

export default Index;