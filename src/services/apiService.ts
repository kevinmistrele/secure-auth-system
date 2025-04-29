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

    const updateUser = async (userId: string, fullName: string, role: "user" | "admin") => {
        try {
            const response = await axiosInstance.put(`/users/${userId}`, { fullName, role });
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    };

    const deleteUser = async (userId: string) => {
        try {
            const response = await axiosInstance.delete(`/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    };

    const requestPasswordReset = async (email: string) => {
        try {
            const response = await axiosInstance.post('/request-password-reset', { email });
            return response.data.success;
        } catch (error) {
            console.error('Error requesting password reset:', error);
            return false;
        }
    };

    const resetPassword = async (token: string, newPassword: string) => {
        try {
            const response = await axiosInstance.post('/reset-password', { token, newPassword });
            return response.data.success;  // Retorna sucesso se tudo der certo
        } catch (error) {
            console.error('Error resetting password:', error);
            return false;
        }
    };

    return {
        getUsers,
        registerUser,
        loginUser,
        registerAdmin,
        updateUser,
        deleteUser,
        requestPasswordReset,
        resetPassword
    };
};

export default useApiService;
