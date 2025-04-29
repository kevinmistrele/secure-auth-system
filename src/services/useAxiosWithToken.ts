import axios from "axios";
import {useAuth} from "@/providers/auth-provider.tsx";

const useAxiosWithToken = () => {
    const { user } = useAuth();

    const axiosInstance = axios.create({
        baseURL: "http://localhost:3001/api",
    });

    if (user && user.token) {
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${user.token}`;
    }

    return axiosInstance;
};

export default useAxiosWithToken;
