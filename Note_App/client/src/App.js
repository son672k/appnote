import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/notes')
            .then(response => setNotes(response.data))
            .catch(error => console.error(error));
    }, []);

    const addNote = () => {
        axios.post('http://localhost:5000/notes', { title, content })
            .then(response => setNotes([...notes, response.data]))
            .catch(error => console.error(error));
    };

    return (
        <div className="container">
            <h1>Ghi chú</h1>
            <input
                type="text"
                placeholder="Tiêu đề"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Nội dung"
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <button onClick={addNote}>Thêm ghi chú</button>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                        <small>Tạo vào lúc {new Date(note.created_at).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;