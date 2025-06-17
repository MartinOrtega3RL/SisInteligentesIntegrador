import React, { useState } from "react";
import { Rate, Button, Input } from "antd";

const ForumPost = ({ post, onRate, onDelete, onComment, user }) => {
  const [comment, setComment] = useState("");

  if (!post) return null;

  const avgRating =
    post.ratings && post.ratings.length
      ? (post.ratings.reduce((a, b) => a + b, 0) / post.ratings.length).toFixed(1)
      : "Sin puntuar";

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      onComment(post.id, comment);
      setComment(""); // Limpiar el campo de comentario
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl shadow-md p-6 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
        <h3 className="font-bold text-xl text-purple-600">{post.title}</h3>
        <span className="italic text-sm text-gray-500">{post.category}</span>
      </div>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="mb-4 max-h-56 w-full object-contain rounded"
        />
      )}
      <p className="mb-2 text-gray-800">{post.content}</p>
      <div className="my-2">
        <b>Ejemplos:</b>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          {post.examples?.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>
      </div>
      <div className="my-2">
        <b>Enlaces:</b>
        <ul className="list-disc ml-6 space-y-1">
          {post.links?.map((link, index) => (
            <li key={index}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 underline break-all"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <span className="text-gray-700">Puntaje:</span>
        <Rate
          allowHalf
          defaultValue={Number(avgRating) || 0}
          onChange={(value) => onRate(post.id, value)}
        />
        <span className="ml-2 text-gray-500">({avgRating})</span>
      </div>
      <div className="flex justify-between mt-4">
        <span className="text-xs text-gray-500">Publicado por: {post.author}</span>
        {/* Mostrar el botón eliminar solo si el usuario es el dueño de la publicación */}
        {user?.email === post.author && (
          <Button
            type="primary"
            danger
            onClick={() => onDelete(post.id)}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Eliminar
          </Button>
        )}
      </div>
      {/* Comentarios */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-purple-600 mb-4">Comentarios</h4>
        {post.comments?.length > 0 ? (
          <ul className="space-y-3">
            {post.comments.map((comment, index) => (
              <li key={index} className="bg-gray-200 p-3 rounded">
                <p className="text-sm text-gray-800">{comment.content}</p>
                <span className="text-xs text-gray-500">- {comment.author}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay comentarios aún.</p>
        )}
        {/* Formulario para agregar comentarios */}
        <div className="mt-4">
          <Input.TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe tu comentario..."
            rows={3}
            className="mb-2"
          />
          <Button
            type="primary"
            onClick={handleCommentSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Comentar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForumPost;