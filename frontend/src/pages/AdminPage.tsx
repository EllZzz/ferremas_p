import { useState } from 'react';
import { ShoppingCart, Users, Tags, LayoutGrid } from 'lucide-react';
import ProductsAdmin from '../components/admin-categories/ProductsAdmin';
import UsersAdmin from '../components/admin-categories/UsersAdmin';
import BrandsAdmin from '../components/admin-categories/BrandsAdmin';
import CategoriesAdmin from '../components/admin-categories/CategoriesAdmin';

const AdminPage = () => {
  const [activeTable, setActiveTable] = useState<'products' | 'users' | 'brand' | 'categories'>('products');

  return (
    <div className="min-h-screen w-screen bg-gray-50 p-6 space-y-10">
      <div className="flex gap-4 mb-4 flex-wrap">
        <button onClick={() => setActiveTable('products')} className={`flex items-center gap-2 px-4 py-2 rounded-full ${activeTable === 'products' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
          <ShoppingCart size={18} /> Productos
        </button>
        <button onClick={() => setActiveTable('users')} className={`flex items-center gap-2 px-4 py-2 rounded-full ${activeTable === 'users' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
          <Users size={18} /> Usuarios
        </button>
        <button onClick={() => setActiveTable('brand')} className={`flex items-center gap-2 px-4 py-2 rounded-full ${activeTable === 'brand' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
          <Tags size={18} /> Marcas
        </button>
        <button onClick={() => setActiveTable('categories')} className={`flex items-center gap-2 px-4 py-2 rounded-full ${activeTable === 'categories' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
          <LayoutGrid size={18} /> Categorías
        </button>
      </div>

      {activeTable === 'products' && <ProductsAdmin />}
      {activeTable === 'users' && <UsersAdmin />}
      {activeTable === 'brand' && <BrandsAdmin />}
      {activeTable === 'categories' && <CategoriesAdmin />}
    </div>
  );
};

export default AdminPage;