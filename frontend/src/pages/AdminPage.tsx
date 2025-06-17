// AdminPage.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Pencil } from 'lucide-react';

interface Product {
  idProduct: number;
  product_name: string;
  fk_idBrand: number;
  stock: number;
  product_unitprice: number;
  product_img?: string;
  fk_category: number;
  brand?: { name: string };
  category?: { name: string };
}

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  rol?: { name: string };
  commune?: { name: string };
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<Partial<Product>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await axios.put(`${API_PRODUCTS}/${editingId}`, form);
      } else {
        await axios.post(API_PRODUCTS, form);
      }
      setForm({});
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setForm(product);
    setEditingId(product.idProduct);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_PRODUCTS}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow w-screen max-w-none px-4 lg:px-8 py-8 space-y-12">
        {/* Productos */}
        <section>
          <h1 className="text-4xl font-bold text-blue-800 mb-6">Productos</h1>

          {/* Formulario */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">{editingId ? 'Editar' : 'Agregar'} Producto</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="product_name" placeholder="Nombre" value={form.product_name || ''} onChange={handleChange} className="border p-2 rounded" />
              <input name="stock" type="number" placeholder="Stock" value={form.stock || ''} onChange={handleChange} className="border p-2 rounded" />
              <input name="product_unitprice" type="number" placeholder="Precio" value={form.product_unitprice || ''} onChange={handleChange} className="border p-2 rounded" />
              <input name="fk_idBrand" type="number" placeholder="ID Marca" value={form.fk_idBrand || ''} onChange={handleChange} className="border p-2 rounded" />
              <input name="fk_category" type="number" placeholder="ID Categoría" value={form.fk_category || ''} onChange={handleChange} className="border p-2 rounded" />
              <input name="product_img" placeholder="URL Imagen" value={form.product_img || ''} onChange={handleChange} className="border p-2 rounded" />
            </div>
            <button onClick={handleSave} className="mt-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
              {editingId ? 'Actualizar' : 'Crear'} Producto
            </button>
          </div>

          {/* Tabla */}
          <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-200 text-left">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Marca</th>
                <th className="p-3">Categoría</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Precio</th>
                <th className="p-3">Acciones</th>
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
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(prod)} className="text-blue-600 hover:text-blue-800"><Pencil size={18} /></button>
                    <button onClick={() => handleDelete(prod.idProduct)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Usuarios */}
        <section>
          <h1 className="text-4xl font-bold text-blue-800 mb-6">Usuarios</h1>
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
    </div>
  );
}
