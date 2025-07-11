import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  rol?: { name: string };
  commune?: { name: string };
}

const API_USERS = 'http://localhost:5000/api/users';

const UsersAdmin = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(API_USERS);
    setUsers(res.data);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Lista de Usuarios</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Correo</th>
              <th className="p-2">Dirección</th>
              <th className="p-2">Comuna</th>
              <th className="p-2">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.address}</td>
                <td className="p-2">{user.commune?.name || 'N/A'}</td>
                <td className="p-2">{user.rol?.name || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersAdmin;
