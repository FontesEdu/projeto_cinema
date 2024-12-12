import axios from "axios";

// URL_base https://api.themoviedb.org/3/
// URl_consulta movie/11?api_key=a61dd6dc589247452f401167670b17a2

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
})

export default api;