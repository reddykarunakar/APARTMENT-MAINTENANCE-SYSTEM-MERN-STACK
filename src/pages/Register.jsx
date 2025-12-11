import React from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { name: e.target.name.value, email: e.target.email.value, password: e.target.password.value };
    try { await API.post('/auth/register', body); alert('Registered. Please login'); navigate('/login'); }
    catch (err) { alert(err.response?.data?.message || 'Error'); }
  };
  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Register</h2>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <input name="password" placeholder="Password" type="password" />
      <button type="submit">Register</button>
    </form>
  );
}
