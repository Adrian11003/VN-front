import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export const getDniTipos = async () => {
    try{
        const response = await api.get('http://localhost:3000/dni')
        return response.data;

    } catch (error) {
        console.error('Error al ver dni')
        throw error;
    }
}