import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Aquí debes manejar la lógica de envío del formulario
    console.log(data);
  };

  return (
    <>
      <Navbar />
     
        <h1 className="text-2xl font-bold text-blue-800 mb-4">Contáctanos</h1>
        <p className="mb-4">
          ¿Tienes alguna pregunta, comentario o consulta? ¡No dudes en contactarnos!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              className={`input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Tu Nombre"
              {...register("name", { required: "El nombre es requerido" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="email"
              className={`input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Tu Correo Electrónico"
              {...register("email", { required: "El correo electrónico es requerido", pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">
              Asunto:
            </label>
            <input
              type="text"
              id="subject"
              className={`input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.subject ? 'border-red-500' : ''}`}
              placeholder="Asunto"
              {...register("subject", { required: "El asunto es requerido" })}
            />
            {errors.subject && (
              <p className="text-red-500 text-xs italic">{errors.subject.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Mensaje:
            </label>
            <textarea
              id="message"
              rows={5}
              className={`input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.message ? 'border-red-500' : ''}`}
              placeholder="Escribe tu mensaje aquí..."
              {...register("message", { required: "El mensaje es requerido" })}
            />
            {errors.message && (
              <p className="text-red-500 text-xs italic">{errors.message.message}</p>
            )}
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Enviar Mensaje
          </button>
        </form>
     
      <Footer />
    </>
  );
};

export default Contact;
