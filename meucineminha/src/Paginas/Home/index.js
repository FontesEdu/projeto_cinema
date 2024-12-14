import api from "../Serviços/api";
import { useState, useEffect } from "react";
import "../Estilo/estilo.css"; 

export default function Home() {
    const [filmes, setFilmes] = useState([]);
    const [pesquisa, setPesquisa] = useState();

    async function carregarFilmes() {
        const response = await api.get("movie/now_playing", {
            params: {
                api_key: "a61dd6dc589247452f401167670b17a2",
                language: "pt-BR",
                page: 1,
            },
        });
        setFilmes(response.data.results);
    }

    function handleInputChange(e) {
        e.preventDefault();
        setPesquisa(e.target[0].value);
    }

    async function pesquisar(e) {
        const response = await api.get(`search/movie?query=${pesquisa}`, {
            params: {
                api_key: "a61dd6dc589247452f401167670b17a2",
                language: "pt-BR",
                page: 1,
            },
        });
        setFilmes(response.data.results);
    }

    useEffect(() => {
        if (pesquisa) {
            pesquisar();
        } else {
            carregarFilmes();
        }
    }, [pesquisa]);

    return (
        <div className="home">
            <div className="pesquisa">
                <form onSubmit={(e) => handleInputChange(e)} className="form-pesquisa">
                    <input type="text" placeholder="Pesquisar" className="input-pesquisa" />
                    <input type="submit" className="btn-pesquisa" />
                </form>
            </div>

            <div className="catalogo">
                {filmes.map((filme) => (
                    <div key={filme.id} className="card">
                        <a href={`/detalhes/${filme.id}`} className="link-titulo">
                            <h1 className="titulo-filme">{filme.title}</h1>
                        </a>
                        <img
                            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${filme.backdrop_path}`}
                            alt={filme.title}
                            className="imagem-filme"
                        />
                        <h1 className="descricao-filme">{filme.overview}</h1>
                        <h1 className="nota-filme">{filme.vote_average}</h1>
                        <h1 className="data-lancamento">{filme.release_date}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}
