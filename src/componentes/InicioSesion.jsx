import { useState } from "react";
import { toast } from "react-toastify";
import { login as loginService } from "../services/UsuarioService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const InicioSesion = () => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const cambiarRol = (e) => {
        setUsuario(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (usuario === '' || password === '') {
            toast.error('Por favor, complete todos los campos');
            return;
        }
        try {
            const response = await loginService(usuario, password);
            if (response && response.token) {
                login(response.token, usuario); // Usa el contexto de autenticación
                toast.success('Inicio de sesión exitoso');
                // Redirige según el rol
                if (usuario === 'Administrador') {
                    navigate('/inicio');
                } else if (usuario === 'Vendedor') {
                    navigate('/inicio_vendedor');
                }
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Contraseña incorrecta');
            } else {
                toast.error('Error al iniciar sesión. Verifique sus credenciales.');
            }
        }
    };

    return (
        <div className="bg-[#D0F25E] h-[100vh] w-[100%] flex flex-row">
            <div className="w-[30%] flex-1 flex flex-col justify-center items-center">
                <div className="w-[70%] flex flex-col h-[20%] justify-evenly">
                    <h3 className="text-2xl">Droguería</h3>
                    <h1 className="text-3xl">La Nueva Esperanza</h1>
                </div>
                <div className="w-[60%] mt-4 flex flex-col justify-center items-center">
                    <img className="rounded-full h-auto w-[100%]" src="/nueva_esperanza/img/logo.png" alt="" />
                </div>
            </div>
            <div className="bg-white w-[60%] rounded-l-[40px] overflow-hidden flex flex-col justify-center items-center">
                <div className="p-6 flex flex-col h-[70%] w-[60%] justify-evenly items-center">
                    <div className="flex flex-col h-[20%] w-full justify-between items-center">
                        <h3 className="text-3xl">Iniciar Sesión</h3>
                        <hr className="mb-1 border-[#1e1e1e63] w-full" />
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col h-full w-full justify-evenly items-center">
                        <label className="w-[90%] text-xl" htmlFor="usuario">Usuario</label>
                        <select
                            onChange={cambiarRol}
                            className="text-gray-500 text-lg rounded-lg bg-[#EBEBEB] border-none w-[90%] shadow"
                            id="usuario"
                            required
                        >
                            <option value="">Seleccione un usuario</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Vendedor">Vendedor</option>
                        </select>
                        <label className="w-[90%] text-xl" htmlFor="password">Contraseña</label>
                        <input
                            placeholder="Introduzca su contraseña aquí"
                            className="shadow text-lg rounded-lg bg-[#EBEBEB] border-none w-[90%]"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <hr className="mb-1 border-[#1e1e1e63] w-full" />
                        <button onClick={handleSubmit} type="submit" className="bg-[#D0F25E] py-2 px-10 rounded-lg text-lg hover:bg-[#97b33c] shadow">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InicioSesion;
