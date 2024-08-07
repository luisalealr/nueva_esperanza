import axios from "axios";
import { API_URL } from "../config";

export async function crearVenta(data) {
    try {
        const response = await axios.post(`${API_URL}/buys/`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const dataVenta = response.data;
        return dataVenta;
    } catch (error) {
        if (error.response) {
            console.error('Datos del error:', error.response.data);
            console.error('Status del error:', error.response.status);
            console.error('Headers del error:', error.response.headers);
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor:', error.request);
        } else {
            console.error('Error al configurar la solicitud:', error.message);
        }
        return null
    }
}

export async function getAllVentas(){
    try {
        const result = await axios.get(`${API_URL}/buys/`, {
            headers: {
                'Content-Type': 'aplication/json'
            }
        });
        const data = await result.data;
        return data
    } catch (error) {
        console.error('Error:', error);
        return null
    }    
}

export async function getVentasDelDia(fechaInicio, fechaFin){
    try {
        const result = await axios.get(`${API_URL}/buys/${fechaInicio}/${fechaFin}` , {
            headers: {
                'Content-Type': 'aplication/json'
            }
        });
        const data = await result.data;
        return data
    } catch (error) {
        console.error('Error:', error);
        return null
    }    
}