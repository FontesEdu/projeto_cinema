import api from "../Serviços/api";
import { useState, useEffect } from "react";

export default function Home(){
    
    const [filmes, setFilmes] = useState([]);
    const [pesquisa, setPesquisa] = useState();

    async function loadFilmes(){
        const response = await api.get("movie/now_playing", {
            params : {
                api_key: "a61dd6dc589247452f401167670b17a2",
                language: "pt-BR",
                page : 1
            }
        })
        console.log(response.data.results);
        setFilmes(response.data.results);
    }

    function handleInputChange(e) {
        e.preventDefault();
        setPesquisa(e.target[0].value);
    }

    async function Pesquisar(e) {
        const response = await api.get(`search/movie?query=${pesquisa}`, {
            params: {
                api_key: "a61dd6dc589247452f401167670b17a2",
                language: "pt-BR",
                page: 1
            }
        })
        console.log(response.data.results);
        setFilmes(response.data.results);
    }

    useEffect(() => {
        if (pesquisa) {
            Pesquisar();
        } else {
            loadFilmes();
        }
    
    }, [pesquisa])
    
    return (
        <div>

        <div>
            <h2>Pesquisar:</h2>

            <form onSubmit={(e) => handleInputChange(e)} className="search">
                <input type="text" placeholder= "Pesquisar" id="search" />
                <input type="submit" />
            </form>

            <br></br>
            
        </div> 
        
        <div>

            </div>
            {filmes.map((filme) => (
                <div key={filme.id}>
                    <a href={`/detalhes/${filme.id}`}>
                    <h1>{filme.title}</h1>
                    </a>
                    
                    <img src= {`https://image.tmdb.org/t/p/w600_and_h900_bestv2${filme.backdrop_path}`}></img>
                    <h1>{filme.overview}</h1>
                    <h1>{filme.vote_average}</h1>
                    <h1>{filme.release_date}</h1>
                    
                </div> 
            ))}
            <h1>Estou na Home</h1>
        </div>
    );
}
