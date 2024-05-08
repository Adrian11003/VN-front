import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export const getApoderados = async () => {
    try{
        const response = await api.get('http://localhost:3000/apoderado');
        return response.data;
    } catch (error) {
        console.error('Error al ver apoderados');
        throw error;
    }
};

export const createApoderados = async (apoderados) => {
    try{
        const response = await api.post('http://localhost:3000/apoderado', apoderados)
        return response.data
    } catch (error) {
        console.error('Error al crear apoderados')
    }
}