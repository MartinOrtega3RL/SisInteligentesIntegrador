import React, { useEffect, useState } from "react";
import { db } from "../Firebase/firebaseServices"; // Ensure the path is correct
import { collection, getDocs, addDoc } from "firebase/firestore";
import ForumPost from "../components/ForumPost";

const Foro = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      const postSnapshot = await getDocs(postsCollection);
      const postList = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postList);
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      await addDoc(collection(db, "posts"), { content: newPost });
      setNewPost("");
      // Fetch posts again to update the list
      const postsCollection = collection(db, "posts");
      const postSnapshot = await getDocs(postsCollection);
      const postList = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postList);
    }
  };

  return (
    <div className="forum-container">
      <h1 className="text-2xl font-bold mb-4">Foro</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Escribe tu publicación..."
          className="border p-2 w-full"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2">
          Publicar
        </button>
      </form>
      <div className="posts">
        {posts.map(post => (
          <ForumPost key={post.id} content={post.content} />
        ))}
      </div>
    </div>
  );
};

export default Foro;