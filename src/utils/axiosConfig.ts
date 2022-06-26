import Axios, { AxiosInstance } from "axios";
import { useAppSelector } from "src/redux/hooks";

const axios: AxiosInstance = Axios.create({
    baseURL: 'http://localhost:5000',
});


export default axios;
