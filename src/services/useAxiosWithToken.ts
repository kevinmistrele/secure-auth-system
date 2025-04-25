import axios from "axios";
import {useAuth} from "@/providers/auth-provider.tsx";

// Função personalizada para criar uma instância do axios com o token no cabeçalho
const useAxiosWithToken = () => {
    const { user } = useAuth();

    const axiosInstance = axios.create({
        baseURL: "http://localhost:3001/api",  // URL base do seu backend
    });

    // Configurar o axios para enviar o token nos cabeçalhos de todas as requisições
    if (user && user.token) {
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${user.token}`;
    }

    return axiosInstance;
};

export default useAxiosWithToken;
