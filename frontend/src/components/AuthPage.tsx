import { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, User } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rut: '',
    name: '',
    lastname: '',
    address: '',
    phone: '',
    fk_idRol: 3,
    fk_idCommune: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const url = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/register';
    
    const response = await axios.post(url, formData);
    const data = response.data;

    if (isLogin && data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

}


    alert(`${isLogin ? 'Bienvenido' : 'Registro exitoso'}: ${data.name || data.user.name}`);

    const role = isLogin ? data.role : data.user.role;
    if (role === 1) window.location.href = '/admin';
    else if (role === 2) window.location.href = '/vendedor';
    else if (role === 3) window.location.href = '/';
    else window.location.href = '/';
  } catch (error: any) {
    alert(error.response?.data?.message || 'Error en el proceso');
  }
};

  return (
    <div className="max-w-md mx-auto mt-12 p-6 rounded-lg">
      <div className="flex justify-center mb-6 gap-4">
        <button
          className={`px-4 py-2 rounded-l ${
            isLogin ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-500'
          } !transition-all duration-200`}
          onClick={() => setIsLogin(true)}
        >
          Iniciar sesión
        </button>
        <button
          className={`px-4 py-2 rounded-r ${
            !isLogin ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-500'
          } !transition-all duration-200`}
          onClick={() => setIsLogin(false)}
        >
          Registrarse
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <InputWithIcon
              icon={<User className="w-4 h-4 text-gray-500" />}
              type="text"
              name="rut"
              placeholder="RUT"
              value={formData.rut}
              onChange={handleChange}
            />
            <InputWithIcon
              icon={<User className="w-4 h-4 text-gray-500" />}
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
            />
            <InputWithIcon
              icon={<User className="w-4 h-4 text-gray-500" />}
              type="text"
              name="lastname"
              placeholder="Apellido"
              value={formData.lastname}
              onChange={handleChange}
            />
            <InputWithIcon
              icon={<User className="w-4 h-4 text-gray-500" />}
              type="text"
              name="address"
              placeholder="Dirección"
              value={formData.address}
              onChange={handleChange}
            />
            <InputWithIcon
              icon={<User className="w-4 h-4 text-gray-500" />}
              type="text"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
            />
          </>
        )}

        <InputWithIcon
          icon={<Mail className="w-4 h-4 text-gray-500" />}
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
        />
        <InputWithIcon
          icon={<Lock className="w-4 h-4 text-gray-500" />}
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-800 py-2 my-5 rounded text-white hover:bg-blue-700 !transition-colors !duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLogin ? 'Ingresar' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
}

// Componente auxiliar para inputs con íconos
function InputWithIcon({
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}
