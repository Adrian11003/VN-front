import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export const getAlumnos = async () => {
    try{
        const response = await api.get('http://localhost:3000/alumnos');
        return response.data;
    } catch (error) {
        console.error('Error al ver alumnos');
        throw error;
    }
};

export const createAlumnos = async (alumnos) => {
    try{
        const response = await api.post('http://localhost:3000/alumnos', alumnos)
        return response.data
    } catch (error) {
        console.error('Error al crear alumnos')
    }
}