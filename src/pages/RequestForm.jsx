import React from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function RequestForm() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', e.target.title.value);
    form.append('description', e.target.description.value);
    form.append('category', e.target.category.value);
    form.append('priority', e.target.priority.value);
    for (let f of e.target.photos.files) form.append('photos', f);
    try { await API.post('/requests', form); alert('Submitted'); navigate('/'); }
    catch (err) { alert(err.response?.data?.message || 'Error'); }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Submit Maintenance Request</h2>
      <input name="title" placeholder="Title" />
      <textarea name="description" placeholder="Description" />
      <select name="category"><option value="general">general</option><option value="plumbing">plumbing</option><option value="electrical">electrical</option></select>
      <select name="priority"><option value="low">low</option><option value="medium">medium</option><option value="high">high</option></select>
      <input type="file" name="photos" accept="image/*" multiple />
      <button type="submit">Submit</button>
    </form>
  );
}
