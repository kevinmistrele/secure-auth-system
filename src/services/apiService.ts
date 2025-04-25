import { useAuth } from "@/providers/auth-provider.tsx";  // Certifique-se de que o caminho esteja correto
import axios from "axios";

const useApiService = () => {
    const { user } = useAuth();  // Usando o hook dentro do hook personalizado

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3001/api',  // URL base da sua API
    });

    if (user && user.token) {
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${user.token}`;
    }

    // Funções para interagir com os endpoints
    const getUsers = async () => {
        try {
            const response = await axiosInstance.get('/users');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    };

    const registerUser = async (userData: { name: string; email: string; password: string }) => {
        try {
            const response = await axiosInstance.post('/register', userData);
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    };

    const loginUser = async (email: string, password: string) => {
        try {
            const response = await axiosInstance.post('/login', { email, password });
            return response.data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    const registerAdmin = async (userData: { name: string; email: string; password: string }) => {
        try {
            const response = await axiosInstance.post("/register-admin", userData)
            return response.data
        } catch (error) {
            console.error("Error registering admin:", error)
            throw error
        }
    }

    return {
        getUsers,
        registerUser,
        loginUser,
        registerAdmin,
    };
};

export default useApiService;
