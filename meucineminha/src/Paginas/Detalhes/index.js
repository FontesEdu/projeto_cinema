import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Serviços/api";
import "../Estilo/estilo.css";

export default function Detalhes(){

    const [filmes, setFilmes] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        async function loadFilmes(){
            const response = await api.get(`movie/${id}`, {
                params : {
                    api_key: "a61dd6dc589247452f401167670b17a2",
                    language: "pt-BR",
                    page : 1
                }
            })
            console.log(response.data.title);
            setFilmes(response.data);
        }
        loadFilmes();
    }, [])

    return (
        <div>
            <div key={filmes.id}>
                <h1>{filmes.title}</h1>
                <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${filmes.backdrop_path}`} />
                <h1>{filmes.overview}</h1>
                <h1>Nota: {filmes.vote_average}</h1>
                <h1>Lançamento: {filmes.release_date}</h1>
            </div> 
        </div>
    );
}