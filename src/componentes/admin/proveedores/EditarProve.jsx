import { useState } from "react";
import TemplateAdmin from "../templates/TemplateAdmin";
import axios from 'axios';

const EditarProve = () => {
    const [categoryName, setCategoryName] = useState('');
    const [contact, setContact] = useState(''); // Campo adicional para contacto

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/categories', { name: categoryName, contact });
            // Manejar la respuesta exitosa
            console.log('Proveedor guardado');
            setCategoryName(''); // Limpiar el campo después de guardar
            setContact(''); // Limpiar el campo de contacto
        } catch (error) {
            // Manejar errores
            console.error('Error al guardar el proveedor:', error);
        }
    };

    const handleCancel = () => {
        setCategoryName('');
        setContact(''); // Limpiar el campo de contacto también
    };

    return (
        <TemplateAdmin>
            <div className="bg-[#D0F25E]">
                <h1 className="ml-5 py-3 font-bold text-black text-xl w-full">
                    Editar proveedor
                </h1>
            </div>
            <div className="flex flex-col mt-4 ml-10 w-full">
                <form onSubmit={handleSubmit} className="w-full mt-10">
                    <div className="mb-4 flex flex-row w-[70%]">
                        <label htmlFor="categoryName" className="mr-2 w-48 font-bold">
                            Nombre del proveedor:
                        </label>
                        <input
                            id="categoryName"
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Nombre del proveedor"
                            className="border border-gray-300 p-2 w-[35%] rounded-md"
                        />
                    </div>
                    <div className="mb-4 flex flex-row w-[70%]">
                        <label htmlFor="contact" className="mr-2 w-48 font-bold">
                            Contacto:
                        </label>
                        <input
                            id="contact"
                            type="text"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="contacto del proveedor"
                            className="border border-gray-300 w-[35%] p-2 rounded-md"
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

export default EditarProve;
