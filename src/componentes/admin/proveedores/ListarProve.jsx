import { useEffect, useState } from "react";
import TemplateAdmin from "../templates/TemplateAdmin";
import { IoSearch } from "react-icons/io5";
import { getAllProveedores } from "../../../services/ProveedorService";
import TablaProve from "./TablaProve";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { API_URL } from "../../../config";
import 'react-toastify/dist/ReactToastify.css';

const ListarProveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [buscarDesc, setBuscarDesc] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;

    const crearProveedor = () => {
        navigate('/crear_proveedor');
    };

    useEffect(() => {
        if (message) {
            toast.success(message, { autoClose: 3000 });
            navigate(location.pathname, { replace: true, state: {} });
        }

        getAllProveedores().then(data => {
            if (data && Array.isArray(data)) {
                const filteredData = data.filter(proveedor => proveedor.isActive === 1);
                setProveedores(filteredData);
            } else {
                console.error('Data no es un array');
            }
        }).catch(error => {
            console.error('Error al obtener los proveedores:', error);
        });
    }, [message]);

    const buscador = (e) => {
        setBuscarDesc(e.target.value);
    }

    let results = []
    if (!buscarDesc) {
        results = proveedores;
    } else {
        results = proveedores.filter((dato) =>
            dato.nombre.toLowerCase().includes(buscarDesc.toLowerCase())
        );
    }

    const handleDisable = async (id_proveedor) => {
        try {
            await axios.put(`${API_URL}/provider/isActive/${id_proveedor}`, {
                isActive: 0
            });
            toast.success('Proveedor deshabilitado con éxito', { autoClose: 3000 });
            setProveedores(proveedores.filter(proveedor => proveedor.id_proveedor !== id_proveedor));
        } catch (error) {
            console.error('Error al deshabilitar el proveedor:', error);
            toast.error('Error al deshabilitar el proveedor', { autoClose: 3000 });
        }
    };

    return (
        <TemplateAdmin>
            <ToastContainer />
            <div className="flex flex-col">
                <div className="bg-[#D0F25E]">
                    <h2 className="py-2 px-6 font-semibold text-xl">Proveedores</h2>
                </div>
                <div className="w-full h-16 flex items-center justify-between">
                    <div className="w-[30%] shadow-sm border border-[#999999] rounded-md flex flex-row items-center ml-6">
                        <IoSearch color="rgba(141, 182, 0, 0.79)" fontSize={25} className="m-1" />
                        <input
                            value={buscarDesc}
                            onChange={buscador}
                            type="text" placeholder="Buscar proveedor"
                            className="w-full text-sm h-8 border-none rounded-md"
                        />
                    </div>
                    <button onClick={crearProveedor} className="mr-6 py-1 rounded-md px-6 shadow hover:bg-[#b0d144] bg-[#8DB600]">Registrar Proveedor</button>
                </div>
                <div className="bg-[#D0F25E] h-6 w-full"></div>
                <table>
                    <thead className="bg-[#95A09D] text-left ">
                        <tr>
                            <th className="pl-5">N° de Proveedor</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((proveedor, index) => (
                            <TablaProve
                                key={index}
                                proveedorId={proveedor.id_proveedor}
                                nombre={proveedor.nombre}
                                telefono={proveedor.telefono}
                                onDisable={handleDisable}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </TemplateAdmin>
    );
}

export default ListarProveedores;