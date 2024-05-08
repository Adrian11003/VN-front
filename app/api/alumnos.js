import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-vn-dola.onrender.com'
})

export const getAlumnos = async () => {
    try{
        const response = await api.get('https://api-vn-dola.onrender.com/alumnos');
        return response.data;
    } catch (error) {
        console.error('Error al ver alumnos');
        throw error;
    }
};

export const createAlumnos = async (alumnos) => {
    try{
        const response = await api.post('https://api-vn-dola.onrender.com/alumnos', alumnos)
        return response.data
    } catch (error) {
        console.error('Error al crear alumnos')
    }
}

export const getAlumnoById = async (alumnos_id) => {
    try {
        const response = await api.get(`https://api-vn-dola.onrender.com/alumnos/${alumnos_id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el alumno con ID ${alumnos_id}`, error);
        throw error;
    }
}

export const updateAlumno = async (alumnos_id, updatedAlumno) => {
    try {
        const response = await api.put(`https://api-vn-dola.onrender.com/alumnos/${alumnos_id}`, updatedAlumno);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el alumno con ID ${alumnos_id}`, error);
        throw error;
    }
};

export const deleteAlumno = async (alumnos_id) => {
    const alumnoId = Number(alumnos_id); // Convertir id a número

    console.log("id recibido: ",alumnos_id);
    
    if (isNaN(alumnoId)) {
        throw new Error('ID inválido');
    }

    try {
        const response = await api.delete(`https://api-vn-dola.onrender.com/alumnos/${alumnos_id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el alumno con ID ${alumnos_id}`, error);
        throw error;
    }
};