export default function Home() {
    return (
        <>
        <section className="bg-gray-100">
                    <div className="max-w-7xl mx-auto p-4">
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                                <div className="p-6 text-center">
                                    <h2 className="text-2xl font-bold text-blue-800">¡Aprovecha nuestras ofertas de abril!</h2>
                                    <p className="mt-2 text-gray-700">Hasta 40% en herramientas eléctricas</p>
                                    <a href="#" className="mt-4 inline-block bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-800">Ver productos</a>
                                </div>
                        </div>
                    </div>
                </section>
    
                <section className="py-10 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <h3 className="text-xl font-bold text-blue-800 mb-6">Categorías destacadas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
                               
                                    <h4 className="text-lg font-semibold">Herramientas</h4>
                            </div>
                            <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
                                
                                    <h4 className="text-lg font-semibold">Electricidad</h4>
                            </div>
                            <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
                                
                                    <h4 className="text-lg font-semibold">Pinturas</h4>
                            </div>
                        </div>
                    </div>
                </section>
    
                <section className="bg-blue-800 text-white py-10 text-center">
                    <h2 className="text-2xl font-bold mb-2">¿Tienes dudas? ¡Estamos para ayudarte!</h2>
                    <p className="mb-4">Contáctanos para cotizaciones, productos especiales o ayuda personalizada.</p>
                    <a href="#" className="bg-yellow-400 text-blue-800 px-6 py-3 rounded hover:bg-yellow-300">Habla con un asesor</a>
                </section>
        </>
      );
}