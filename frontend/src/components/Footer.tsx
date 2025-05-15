
export default function Footer() {
    return (
        <>
            <footer className="bg-gray-800 text-gray-300 py-6">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <h5 className="font-bold text-white mb-2">FERRE+MAS</h5>
                        <p>Tu ferretería de confianza desde 19XX.</p>
                    </div>
                    <div>
                        <h5 className="font-bold text-white mb-2">Contacto</h5>
                        <p>📍 Calle Falsa 123, Ciudad</p>
                        <p>📞 +56 9 1234 5678</p>
                    </div>
                    <div>
                        <h5 className="font-bold text-white mb-2">Síguenos</h5>
                        <p>Facebook · Instagram · WhatsApp</p>
                    </div>
                </div>
            </footer>

        </>
    );
}