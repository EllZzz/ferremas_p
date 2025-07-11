import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';

interface Product {
  idProduct: number;
  product_name: string;
  fk_idBrand: number;
  stock: number;
  product_unitprice: number;
  product_img?: string;
  fk_category: number;
  productBrand?: { name: string };
  productCategory?: { name: string };
}

const API_PRODUCTS = 'http://localhost:5000/api/products';

const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(API_PRODUCTS);
    setProducts(res.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const requiredFields = ['product_name', 'stock', 'product_unitprice', 'fk_idBrand', 'fk_category'];
    const emptyFields = requiredFields.filter(field => !form[field as keyof Product]);

    if (emptyFields.length > 0) {
      setErrorMessage('Por favor completa todos los campos obligatorios.');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_PRODUCTS}/${editingId}`, form);
      } else {
        await axios.post(API_PRODUCTS, form);
      }
      setForm({});
      setEditingId(null);
      setErrorMessage(null);
      fetchProducts();
    } catch (err) {
      setErrorMessage('Error al guardar el producto. Intenta nuevamente.');
    }
  };

  const handleEdit = (product: Product) => {
    setForm(product);
    setEditingId(product.idProduct);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${API_PRODUCTS}/${id}`);
    fetchProducts();
  };


  return (
    <>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Agregar / Editar Producto</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <input name="product_name" placeholder="Nombre" value={form.product_name || ''} onChange={handleChange} className="border p-2 rounded" />
          <input name="stock" type="number" placeholder="Stock" value={form.stock || ''} onChange={handleChange} className="border p-2 rounded" />
          <input name="product_unitprice" type="number" placeholder="Precio" value={form.product_unitprice || ''} onChange={handleChange} className="border p-2 rounded" />
          <input name="fk_idBrand" type="number" placeholder="ID Marca" value={form.fk_idBrand || ''} onChange={handleChange} className="border p-2 rounded" />
          <input name="fk_category" type="number" placeholder="ID Categoría" value={form.fk_category || ''} onChange={handleChange} className="border p-2 rounded" />
          <input name="product_img" placeholder="URL Imagen" value={form.product_img || ''} onChange={handleChange} className="border p-2 rounded" />
        </div>
        {errorMessage && (
            <div className="text-red-600 mt-2 font-semibold">
              {errorMessage}
            </div>
          )}
        <button onClick={handleSave} className="mt-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
          {editingId ? 'Actualizar' : 'Crear'} Producto
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold text-blue-800">Lista de Productos</h2>
          <span className="text-gray-600">Total: {products.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-2">Imagen</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Marca</th>
                <th className="p-2">Categoría</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(prod => (
                <tr key={prod.idProduct} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    <img src={`http://localhost:5000${prod.product_img}`} alt={prod.product_name} className="h-12 w-12 object-contain rounded" />
                  </td>
                  <td className="p-2">{prod.product_name}</td>
                  <td className="p-2">{prod.productBrand?.name || prod.fk_idBrand}</td>
                  <td className="p-2">{prod.productCategory?.name || prod.fk_category}</td>
                  <td className="p-2">{prod.stock}</td>
                  <td className="p-2">${prod.product_unitprice}</td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => handleEdit(prod)} className="bg-yellow-400 p-1 rounded text-white"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(prod.idProduct)} className="bg-red-600 p-1 rounded text-white"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductsAdmin;