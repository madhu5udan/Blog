import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import './editor.css';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

function Write() {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [file, setFile] = useState('');
  const [title, setTitle] = useState(state?.title || '');
  const [cat, setCat] = useState(state?.cat || ''); // ✅ fixed category initialization

  // Tiptap editor instance
  const editor = useEditor({
    extensions: [StarterKit],
    content: state?.desc || '', // ✅ prefill editor content when editing
  });

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/api/upload', formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editor) return; // ✅ guard against null editor

    const imgURL = file ? await upload() : '';
    const content = editor.getHTML(); // ✅ get HTML content from Tiptap

    try {
      if (state) {
        // Editing existing post
        await axios.put(`/api/posts/${state.id || state._id}`, {
          title,
          desc:content,
          cat,
          img: imgURL,
        });
      } else {
        // Creating new post
        await axios.post(`/api/posts`, {
          title,
          desc:content,
          cat,
          img: imgURL,
          date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        });
      }
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="editorContainer">
          {/* Toolbar */}
          <div className="toolbar">
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={editor?.isActive('bold') ? 'active' : ''}
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={editor?.isActive('italic') ? 'active' : ''}
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor?.isActive('heading', { level: 2 }) ? 'active' : ''
              }
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={editor?.isActive('bulletList') ? 'active' : ''}
            >
              • List
            </button>
          </div>

          {/* Editor */}
          <EditorContent editor={editor} className="editor" />
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: 'none' }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>

        <div className="item">
          <h1>Category</h1>
          {['art', 'science', 'technology', 'design', 'food', 'cinema'].map(
            (c) => (
              <div className="cat" key={c}>
                <input
                  type="radio"
                  name="cat"
                  checked={cat === c}
                  value={c}
                  id={c}
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </label>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Write;
