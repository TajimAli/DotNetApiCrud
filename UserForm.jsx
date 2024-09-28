import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ userName: '', countryName: '', countryCode: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchUsers = async () => {
        const response = await axios.get('https://localhost:7013/api/Users');
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`https://localhost:7013/api/Users/${editingId}`, user);
        } else {
            await axios.post('https://localhost:7013/api/Users', user);
        }
        setUser({ userName: '', countryName: '', countryCode: '' });
        setEditingId(null);
        fetchUsers();
    };

    const handleEdit = (u) => {
        setUser(u);
        setEditingId(u.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`https://localhost:7013/api/Users/${id}`);
        fetchUsers();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="userName" value={user.userName} onChange={handleChange} placeholder="User Name" required />
                <input type="text" name="countryName" value={user.countryName} onChange={handleChange} placeholder="Country Name" required />
                <input type="text" name="countryCode" value={user.countryCode} onChange={handleChange} placeholder="Country Code" required />
                <button type="submit">{editingId ? 'Update' : 'Add'} User</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Country Name</th>
                        <th>Country Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.userName}</td>
                            <td>{u.countryName}</td>
                            <td>{u.countryCode}</td>
                            <td>
                                <button onClick={() => handleEdit(u)}>Edit</button>
                                <button onClick={() => handleDelete(u.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserForm;
