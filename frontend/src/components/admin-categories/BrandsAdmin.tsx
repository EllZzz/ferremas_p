import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';

interface Brand {
  idBrand: number;
  name: string;
}

const API_BRAND = 'http://localhost:5000/api/brand';

const BrandsAdmin = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandForm, setBrandForm] = useState<Partial<Brand>>({});
  const [brandEditingId, setBrandEditingId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const res = await axios.get(API_BRAND);
    setBrands(res.data);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setBrandForm(prev => ({ ...prev, name: value }));
    }
  };

  const resetBrandForm = () => {
    setBrandForm({});
    setBrandEditingId(null);
    setErrorMessage(null);
  };


  const handleBrandSave = async () => {
    const trimmed = brandForm.name?.trim() || '';

    if (!trimmed) {
      setErrorMessage('El nombre no puede estar vacío.');
      return;
    }

    const nameAlreadyExists = brands.some(
      (b) =>
        b.name.trim().toLowerCase() === trimmed.toLowerCase() &&
        b.idBrand !== brandEditingId
    );

    if (nameAlreadyExists) {
      setErrorMessage('Ya existe una marca con ese nombre.');
      return;
    }

    try {
      if (brandEditingId) {
        await axios.put(`${API_BRAND}/${brandEditingId}`, { name: trimmed });
      } else {
        await axios.post(API_BRAND, { name: trimmed });
      }
      await fetchBrands();
      resetBrandForm();
    } catch (err) {
      console.error('Error guardando marca:', err);
      setErrorMessage('Error al guardar la marca.');
    }
  };


  const handleBrandEdit = (b: Brand) => {
    setBrandForm(b);
    setBrandEditingId(b.idBrand);
  };

  const handleBrandDelete = async (id: number) => {
    await axios.delete(`${API_BRAND}/${id}`);
    fetchBrands();
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-blue-800">CRUD de Marcas</h2>
      <div className="flex gap-4">
        <input
          name="name"
          placeholder="Nombre de la marca"
          value={brandForm.name || ''}
          onChange={handleBrandChange}
          className="border p-2 rounded w-full"
        />
        
        {errorMessage && (
          <div className="text-red-600 font-semibold mt-1">{errorMessage}</div>
        )}

        <button onClick={handleBrandSave} className="bg-blue-700 text-white px-4 py-2 rounded">
          {brandEditingId ? 'Actualizar' : 'Crear'}
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
          {brands.map(b => (
            <tr key={b.idBrand} className="border-b hover:bg-gray-50">
              <td className="p-2">{b.idBrand}</td>
              <td className="p-2">{b.name}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleBrandEdit(b)} className="bg-yellow-400 p-1 rounded text-white">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleBrandDelete(b.idBrand)} className="bg-red-600 p-1 rounded text-white">
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

export default BrandsAdmin;
