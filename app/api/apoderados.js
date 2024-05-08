import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-vn-dola.onrender.com'
})

export const getApoderados = async () => {
    try{
        const response = await api.get('https://api-vn-dola.onrender.com/apoderado');
        return response.data;
    } catch (error) {
        console.error('Error al ver apoderados');
        throw error;
    }
};

export const createApoderados = async (apoderados) => {
    try{
        const response = await api.post('https://api-vn-dola.onrender.com/apoderado', apoderados)
        return response.data
    } catch (error) {
        console.error('Error al crear apoderados')
    }
}

export const getApoderadoById = async (apoderado_id) => {
    try {
        const response = await api.get(`https://api-vn-dola.onrender.com/apoderado/${apoderado_id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el apoderado con ID ${apoderado_id}`, error);
        throw error;
    }
}

export const updateApoderado = async (apoderado_id, updatedApoderado) => {
    try {
        const response = await api.put(`https://api-vn-dola.onrender.com/apoderado/${apoderado_id}`, updatedApoderado);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el apoderado con ID ${apoderado_id}`, error);
        throw error;
    }
};

export const deleteApoderado = async (apoderado_id) => {
    const alumnoId = Number(apoderado_id); // Convertir id a número

    console.log("id recibido: ",apoderado_id);
    
    if (isNaN(alumnoId)) {
        throw new Error('ID inválido');
    }

    try {
        const response = await api.delete(`https://api-vn-dola.onrender.com/apoderado/${apoderado_id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el apoderado con ID ${apoderado_id}`, error);
        throw error;
    }
};