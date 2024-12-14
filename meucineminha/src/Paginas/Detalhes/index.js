import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../Serviços/api";
import "../Estilo/estiloDetalhes.css";

export default function Detalhes() {
    const [filmes, setFilmes] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get(`movie/${id}`, {
                params: {
                    api_key: "a61dd6dc589247452f401167670b17a2",
                    language: "pt-BR",
                    page: 1,
                },
            });
            setFilmes(response.data);
        }
        loadFilmes();
    }, [id]);

    return (
        <div className="detalhes">
            <div className="card-detalhes" key={filmes.id}>
                <h1 className="titulo-filme">{filmes.title}</h1>
                <img
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${filmes.backdrop_path}`}
                    alt={filmes.title}
                    className="imagem-filme"
                />
                <p className="descricao-filme">{filmes.overview}</p>
                <h3 className="nota-filme">Nota: {filmes.vote_average}</h3>
                <h3 className="data-lancamento">Lançamento: {filmes.release_date}</h3>
                <Link to="/" className="link-voltar">Voltar</Link>
            </div>
        </div>
    );
}
