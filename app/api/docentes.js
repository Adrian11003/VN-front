import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-vn-dola.onrender.com'
})

export const getDocentes = async () => {
    try{
        const response = await api.get('https://api-vn-dola.onrender.com/docentes');
        return response.data;
    } catch (error) {
        console.error('Error al ver apoderados');
        throw error;
    }
};

export const createDocentes = async (docentes) => {
    try{
        const response = await api.post('https://api-vn-dola.onrender.com/docentes', docentes)
        return response.data
    } catch (error) {
        console.error('Error al crear apoderados')
    }
}

export const getDocentesById = async (docente_id) => {
    try {
        const response = await api.get(`https://api-vn-dola.onrender.com/docentes/${docente_id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el apoderado con ID ${docente_id}`, error);
        throw error;
    }
}

export const updateDocentes = async (docente_id, updatedDocentes) => {
    try {
        const response = await api.put(`https://api-vn-dola.onrender.com/docentes/${docente_id}`, updatedDocentes);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el apoderado con ID ${docente_id}`, error);
        throw error;
    }
};

export const deleteDocentes = async (docente_id) => {
    const alumnoId = Number(docente_id); // Convertir id a número

    console.log("id recibido: ",docente_id);
    
    if (isNaN(alumnoId)) {
        throw new Error('ID inválido');
    }

    try {
        const response = await api.delete(`https://api-vn-dola.onrender.com/docentes/${docente_id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el apoderado con ID ${docente_id}`, error);
        throw error;
    }
};