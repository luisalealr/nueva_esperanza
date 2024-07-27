import { useEffect, useState } from "react";
import TemplateAdmin from "../templates/TemplateAdmin";
import axios from 'axios';

const CrearCategoria = () => {
    const [categoryName, setCategoryName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Obtener todas las categorías existentes
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://backendfarmacia-production.up.railway.app/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedCategoryName = categoryName.trim(); // Trim espacios en blanco

        // Verificar si la categoría ya existe
        const categoryExists = categories.some(category => category.descripcion.toLowerCase() === trimmedCategoryName.toLowerCase());

        if (categoryExists) {
            setError('La categoría ya existe');
            setMessage('');
            return;
        }

        try {
            await axios.post(
                'https://backendfarmacia-production.up.railway.app/api/categories',
                {
                    descripcion: trimmedCategoryName,
                    isActive: 1
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setMessage('Categoría guardada correctamente');
            setError('');
            setCategoryName('');
            // Actualizar la lista de categorías
            setCategories([...categories, { descripcion: trimmedCategoryName }]);
        } catch (error) {
            setMessage('');
            setError('Error al guardar la categoría: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleCancel = () => {
        setCategoryName('');
        setMessage('');
        setError('');
    };

    return (
        <TemplateAdmin>
            <div className="bg-[#D0F25E]">
                <h1 className="ml-5 py-3 font-bold text-black text-xl w-full">
                    Crear Categoría
                </h1>
            </div>
            <div className="flex flex-col mt-4 ml-5">
                {message && (
                    <div className="bg-green-200 text-green-800 p-2 rounded mb-4">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="bg-red-200 text-red-800 p-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="w-full max-w-lg mt-10">
                    <div className="mb-4 flex items-center">
                        <label htmlFor="categoryName" className="ml-10 mr-2 font-bold w-40">
                            Nombre de la categoría:
                        </label>
                        <input
                            id="categoryName"
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Escriba el nombre de la nueva categoría"
                            className="border border-gray-300 p-2 rounded-md flex-grow"
                        />
                    </div>
                    <div className="flex m-10">
                        <button
                            type="submit"
                            className="bg-[#8DB600] text-black py-2 px-4 rounded-full"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-[#8DB600] mx-6 text-black py-2 px-4 rounded-full"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>

        </TemplateAdmin>
    );
};

export default CrearCategoria;