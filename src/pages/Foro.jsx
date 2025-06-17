import React, { useEffect, useState } from "react";
import { db } from "../Firebase/firebaseServices.js";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import ForumPost from "../components/ForumPost.jsx";
import { toast } from "sonner";
import { Input } from "antd"; // Importar el componente Input
import { SearchOutlined } from "@ant-design/icons"; // Importar ícono de búsqueda

const initialPost = {
  title: "",
  category: "",
  imageUrl: "",
  content: "",
  examples: "",
  links: "",
};

const Foro = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [newPost, setNewPost] = useState(initialPost);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const fetchPosts = async () => {
    const postsCollection = collection(db, "posts");
    const postSnapshot = await getDocs(postsCollection);
    const postList = postSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      examples: doc.data().examples || [],
      links: doc.data().links || [],
      ratings: doc.data().ratings || [],
      comments: doc.data().comments || [],
    }));
    setPosts(postList);
    setFilteredPosts(postList);
  };

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPost.title.trim() && newPost.content.trim()) {
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, "posts"), {
          ...newPost,
          examples: newPost.examples.split(",").map((e) => e.trim()).filter(Boolean),
          links: newPost.links.split(",").map((l) => l.trim()).filter(Boolean),
          author: user.email,
          createdAt: Date.now(),
          ratings: [],
          comments: [],
        });
        setNewPost(initialPost);
        fetchPosts();
        toast.success("Tu post ha sido publicado correctamente.");
      } catch (error) {
        toast.error("Hubo un error al publicar el post.");
        console.error("Error al publicar el post:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleRate = async (postId, value) => {
    const postRef = doc(db, "posts", postId);
    const post = posts.find((p) => p.id === postId);
    const newRatings = [...(post.ratings || []), value];
    await updateDoc(postRef, { ratings: newRatings });
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === postId ? { ...p, ratings: newRatings } : p))
    );
  };

  const handleDelete = async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      await deleteDoc(postRef);
      setPosts(posts.filter((post) => post.id !== postId));
      toast.success("El post ha sido eliminado correctamente.");
    } catch (error) {
      toast.error("Hubo un error al eliminar el post.");
      console.error("Error al eliminar el post:", error);
    }
  };

  const handleComment = async (postId, content) => {
    const postRef = doc(db, "posts", postId);
    const post = posts.find((p) => p.id === postId);
    const newComment = {
      author: user.email,
      content,
      createdAt: Date.now(),
    };
    const updatedComments = [...(post.comments || []), newComment];
    await updateDoc(postRef, { comments: updatedComments });
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === postId ? { ...p, comments: updatedComments } : p
      )
    );
    toast.success("Comentario agregado correctamente.");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full bg-gray-200 py-6 shadow-lg">
        <h1
          className="text-3xl font-bold text-center tracking-wide 
                 text-transparent bg-clip-text
                 bg-gradient-to-br from-[hsl(var(--ai-gradient-from))] to-[hsl(var(--ai-gradient-to))]"
        >
          Foro de Sistemas Inteligentes
        </h1>
      </header>
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row gap-10">
        {/* Formulario */}
        <section className="w-full md:w-1/3 bg-gray-100 text-black rounded-xl shadow-lg p-8 mb-10 md:mb-0">
          <h2 className="text-xl font-semibold mb-6 text-purple-600">Publicar nuevo tema</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="title"
              value={newPost.title}
              onChange={handleChange}
              placeholder="Título"
              className="border border-gray-400 rounded px-3 py-2 w-full text-black bg-gray-200"
              required
            />
            <input
              name="category"
              value={newPost.category}
              onChange={handleChange}
              placeholder="Clasificación (ej: Basados en Conocimiento)"
              className="border border-gray-400 rounded px-3 py-2 w-full text-black bg-gray-200"
            />
            <input
              name="imageUrl"
              value={newPost.imageUrl}
              onChange={handleChange}
              placeholder="URL de imagen"
              className="border border-gray-400 rounded px-3 py-2 w-full text-black bg-gray-200"
            />
            <textarea
              name="content"
              value={newPost.content}
              onChange={handleChange}
              placeholder="¿En qué consiste?"
              className="border border-gray-400 rounded px-3 py-2 w-full text-black bg-gray-200"
              required
            />
            <input
              name="examples"
              value={newPost.examples}
              onChange={handleChange}
              placeholder="Ejemplos (separados por coma)"
              className="border border-gray-400 rounded px-3 py-2 w-full text-black bg-gray-200"
            />
            <input
              name="links"
              value={newPost.links}
              onChange={handleChange}
              placeholder="Enlaces de interés (separados por coma)"
              className="border border-gray-400 rounded px-3 py-2 w-full text-black bg-gray-200"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-2 rounded transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {isSubmitting ? "Publicando..." : "Publicar"}
            </button>
          </form>
        </section>
        {/* Buscador y Posts */}
        <section className="w-full md:w-2/3 flex flex-col gap-8">
          {/* Buscador */}
          <div className="relative mb-6">
            <Input
              prefix={<SearchOutlined className="text-gray-400" />} // Ícono de búsqueda
              placeholder="Buscar por título, categoría o autor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-4 w-full shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
          {/* Posts */}
          {filteredPosts.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">No hay publicaciones que coincidan con la búsqueda.</div>
          ) : (
            filteredPosts.map((post) => (
              <ForumPost
                key={post.id}
                post={post}
                onRate={handleRate}
                onDelete={handleDelete}
                onComment={handleComment}
                user={user}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default Foro;