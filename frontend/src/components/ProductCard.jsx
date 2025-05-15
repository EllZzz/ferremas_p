export default function ProductCard() {
  return (
    <div className="max-w-xs rounded-2xl overflow-hidden shadow-md border p-4 bg-white">
      
      <h2 className="text-sm font-semibold text-gray-800 mb-1">Sandley</h2>
      <p className="text-sm text-gray-600 leading-snug mb-3">
        Taladro percutor inalámbrico TE-CD 18/44 Li-i + batería
      </p>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl font-bold text-gray-900">$ 79.990</span>
        <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded font-semibold">16%</span>
      </div>
      <p className="text-sm text-gray-400 line-through mb-4">Normal: $ 94.990</p>
      <button
        type="button"
        className="w-full border border-gray-400 text-gray-800 text-sm py-2 rounded-md hover:bg-gray-100 transition"
      >
        Añadir al carro
      </button>
    </div>
  );
}