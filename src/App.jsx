import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

function App() {
  const [pokemonNames, setPokemonNames] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const allpokemonList = [];
        for (let i = 1; i <= 100; i++) {
          const res = await instance.get(`/pokemon/${i}`);
          const speciesRes = await instance.get(`/pokemon-species/${i}`);
          const koreanName = speciesRes.data.names.find(
            (name) => name.language.name === "ko"
          );
          allpokemonList.push({ ...res.data, koreanName: koreanName.name });
        }

        setPokemonNames(allpokemonList);
      } catch (error) {
        console.error(`error ${error}`);
        alert("오류가 있습니다. 콘솔을 확인해주세요");
      }
    };
    getData();
  }, []);

  return (
    <>
      {pokemonNames.map((pokemonName) => {
        return (
          <div key={pokemonName.id}>
            <img
              src={
                pokemonName?.sprites?.versions?.["generation-v"]?.[
                  "black-white"
                ]?.animated?.front_default
              }
              alt={pokemonName.koreanName}
            />
            <div>{pokemonName.koreanName}</div>
          </div>
        );
      })}
    </>
  );
}

export default App;
