import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type Product = {
  idProduct: number;
  product_name: string;
  fk_idBrand: number;
  stock: number;
  product_unitprice: number;
  product_img?: string;
  fk_category: number;
  brand?: { name: string };
  category?: { name: string };
};

type User = {
  id: number;
  name: string;
  email: string;
  address: string;
  rol?: { name: string };
  commune?: { name: string };
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const API_PRODUCTS = 'http://localhost:5000/api/products';
  const API_USERS = 'http://localhost:5000/api/users';

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_PRODUCTS);
      setProducts(res.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_USERS);
      setUsers(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow w-screen max-w-none px-4 lg:px-8 py-8 space-y-12">
        <section>
          <h1 className="text-4xl font-bold text-blue-800 mb-6">Lista de Productos</h1>
          <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-200 text-left">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Marca</th>
                <th className="p-3">Categoría</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Precio</th>
              </tr>
            </thead>
            <tbody>
              {products.map(prod => (
                <tr key={prod.idProduct} className="border-t hover:bg-gray-50">
                  <td className="p-3">{prod.idProduct}</td>
                  <td className="p-3">{prod.product_name}</td>
                  <td className="p-3">{prod.brand?.name || prod.fk_idBrand}</td>
                  <td className="p-3">{prod.category?.name || prod.fk_category}</td>
                  <td className="p-3">{prod.stock}</td>
                  <td className="p-3">${prod.product_unitprice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Tabla de usuarios */}
<section>
  <h1 className="text-4xl font-bold text-blue-800 mb-6">Lista de Usuarios</h1>
  <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
    <thead className="bg-green-200 text-left">
      <tr>
        <th className="p-3">Nombre</th>
        <th className="p-3">Correo</th>
        <th className="p-3">Dirección</th>
        <th className="p-3">Comuna</th>
        <th className="p-3">Rol</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id} className="border-t hover:bg-gray-50">
          <td className="p-3">{user.name}</td>
          <td className="p-3">{user.email}</td>
          <td className="p-3">{user.address}</td>
          <td className="p-3">{user.commune?.name || 'N/A'}</td>
          <td className="p-3">{user.rol?.name || 'N/A'}</td>
        </tr>
      ))}
    </tbody>
  </table>
</section>


      </main>
      <Footer />
    </div>
  );
}
