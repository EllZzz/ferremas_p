import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';

interface Category {
  idCategory: number;
  name: string;
}

const API_CATEGORIES = 'http://localhost:5000/api/categories';

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryForm, setCategoryForm] = useState<{ name: string }>({ name: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ───────────────────────────────── fetch ────────────────────────────────────
  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_CATEGORIES);
      const formatted: Category[] = res.data.map((c: any) => ({
        idCategory: c.idCategory,
        name: c.name ?? c.Category_name
      }));
      setCategories(formatted);
    } catch (err) {
      console.error('Error al obtener categorías:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ───────────────────────────────── handlers ─────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryForm({ name: e.target.value });
  };

  const resetForm = () => {
    setCategoryForm({ name: '' });
    setEditingId(null);
    setErrorMessage(null);
  };


  const saveCategory = async () => {
    const trimmed = categoryForm.name.trim();
    if (!trimmed) {
      setErrorMessage('El nombre no puede estar vacío.');
      return;
    }

    const nameAlreadyExists = categories.some(
      (cat) =>
        cat.name.trim().toLowerCase() === trimmed.toLowerCase() &&
        cat.idCategory !== editingId
    );

    if (nameAlreadyExists) {
      setErrorMessage('Ya existe una categoría con ese nombre.');
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_CATEGORIES}/${editingId}`, { name: trimmed });
      } else {
        await axios.post(API_CATEGORIES, { name: trimmed });
      }
      await fetchCategories();
      resetForm();
    } catch (err) {
      console.error('Error guardando categoría:', err);
      setErrorMessage('Error al guardar la categoría.');
    } finally {
      setLoading(false);
    }
  };


  const editCategory = (c: Category) => {
    setCategoryForm({ name: c.name });
    setEditingId(c.idCategory);
  };

  const deleteCategory = async (id: number) => {
    if (!confirm('¿Eliminar esta categoría de forma permanente?')) return;
    try {
      await axios.delete(`${API_CATEGORIES}/${id}`);
      await fetchCategories();
    } catch (err) {
      console.error('Error eliminando categoría:', err);
    }
  };

  // ──────────────────────────────── render ───────────────────────────────────
  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-blue-800">CRUD de Categorías</h2>
      <div className="flex gap-4">
        <input
          name="name"
          placeholder="Nombre de la categoría"
          value={categoryForm.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          disabled={loading}
        />
        {errorMessage && (
          <div className="text-red-600 font-semibold mt-1">{errorMessage}</div>
        )}

        <button
          onClick={saveCategory}
          className="bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {editingId ? 'Actualizar' : 'Crear'}
        </button>
      </div>

      <table className="min-w-full text-sm text-left mt-4">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.idCategory} className="border-b hover:bg-gray-50">
              <td className="p-2">{c.idCategory}</td>
              <td className="p-2">{c.name}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => editCategory(c)}
                  className="bg-yellow-400 p-1 rounded text-white"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => deleteCategory(c.idCategory)}
                  className="bg-red-600 p-1 rounded text-white"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesAdmin;
