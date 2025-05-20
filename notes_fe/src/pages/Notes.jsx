import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/utils.js";
import { useNavigate } from "react-router-dom";
import axios from '../api/axiosInstance';
import useAuth from "../auth/useAuth";

function NotesApp() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notes`);
      setNotes(response.data.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      const response = await axios.post(`${BASE_URL}/add-note`, { title, content });
      if (response.data.data) {
        setNotes((prevNotes) => [...prevNotes, response.data.data]);
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete-note/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const toggleEditMode = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isEditing: !note.isEditing } : note
      )
    );
  };

  const handleInputChange = (id, field, value) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, [field]: value } : note
      )
    );
  };

  const saveNote = async (id, newTitle, newContent) => {
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      const response = await axios.put(`${BASE_URL}/update-note/${id}`, {
        title: newTitle,
        content: newContent,
      });

      if (response.data.data) {
        await fetchNotes();
      } else {
        alert("Gagal simpan data");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleRefresh = async () => {
    await fetchNotes();
  }

  return (
    <div className="min-h-screen bg-pink-100 p-4">
      {/* 🔓 Tombol Logout */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
        >
          🔓 Logout
        </button>
      </div>

      <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">Daftar Catatan</h1>

      {/* Form tambah catatan */}
      <div className="max-w-md mx-auto bg-pink-50 p-6 rounded-lg shadow mb-6">
        <div className="mb-4">
          <label className="block text-pink-700 font-semibold mb-1 text-center">Judul</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Tulis judul catatan"
          />
        </div>
        <div className="mb-4">
          <label className="block text-pink-700 font-semibold mb-1 text-center">Isi</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-300 h-32 resize-y"
            placeholder="Tulis isi catatan"
          />
        </div>
        <div className="text-center">
          <button
            onClick={addNote}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg shadow"
          >
            Simpan
          </button>
        </div>
      </div>

      {/* Tombol refresh */}
      <div className="flex justify-center mb-6">
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg shadow flex items-center gap-2"
          onClick={handleRefresh}
        >
          🔄 Refresh Catatan
        </button>
      </div>

      {/* Tabel daftar catatan */}
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-pink-300 text-pink-900 font-bold">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Judul</th>
              <th className="px-4 py-3">Isi</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <tr key={note.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3 align-top">{index + 1}</td>
                  <td className="px-4 py-3 align-top">
                    {note.isEditing ? (
                      <input
                        type="text"
                        value={note.title}
                        onChange={(e) =>
                          handleInputChange(note.id, "title", e.target.value)
                        }
                        className="w-full p-1 border rounded"
                      />
                    ) : (
                      note.title
                    )}
                  </td>
                  <td className="px-4 py-3 align-top">
                    {note.isEditing ? (
                      <textarea
                        value={note.content}
                        onChange={(e) =>
                          handleInputChange(note.id, "content", e.target.value)
                        }
                        className="w-full p-1 border rounded"
                      />
                    ) : (
                      <span className="line-clamp-2 text-ellipsis overflow-hidden block max-w-md">
                        {note.content}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 flex items-center justify-center gap-2">
                    {note.isEditing ? (
                      <button
                        onClick={() => {
                          saveNote(note.id, note.title, note.content);
                          toggleEditMode(note.id);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                      >
                        💾
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleEditMode(note.id)}
                        className="bg-pink-400 hover:bg-pink-500 text-white p-2 rounded"
                      >
                        ✏️
                      </button>
                    )}
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="bg-pink-400 hover:bg-pink-500 text-white p-2 rounded"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  Tidak ada catatan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NotesApp;
