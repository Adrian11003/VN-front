import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-vn-dola.onrender.com'
})

export const getDniTipos = async () => {
    try{
        const response = await api.get('https://api-vn-dola.onrender.com/dni')
        return response.data;

    } catch (error) {
        console.error('Error al ver dni')
        throw error;
    }
}