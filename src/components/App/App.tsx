import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

import { Footer } from '../Footer';
import { POKEMON_IMAGE, POKE_URL } from '../../constants';

import './App.scss';

interface PokemonData {
  name: string;
  url: string;
}

function App() {
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [pokemonGuess, setPokemonGuess] = useState<string>();
  const [pokemonSelected, setPokemonSelected] = useState<number>(0);
  const [pokemonWin, setPokemonWin] = useState<boolean>(false);

  const changePokemonSelected = (): void => {
    setPokemonSelected(Math.floor(Math.random() * pokemonData?.length));
  };

  const guessThePokemon = (): void => {
    const pokeName = pokemonData[pokemonSelected - 1]?.name;

    if (pokeName === pokemonGuess) {
      setPokemonWin(true);
      setPokemonGuess('');

      setTimeout(() => {
        changePokemonSelected();
        setPokemonWin(false);
      }, 2000);

      return;
    }
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      const data = await (await fetch(POKE_URL)).json();

      setPokemonData(data?.results);
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    if (pokemonData?.length) {
      changePokemonSelected();
    }
  }, [pokemonData]);

  const pokemonStyles = clsx('pokemon', {
    pokemonFiltered: !pokemonWin,
  });

  return (
    <div className="App">
      {pokemonSelected && (
        <img alt="Pokemon" className={pokemonStyles} src={POKEMON_IMAGE(pokemonSelected)} />
      )}

      <h1>Guess the Pokemon</h1>

      <div className="form">
        <input
          className="input"
          disabled={pokemonWin}
          type="text"
          value={pokemonGuess}
          onChange={({ target }) => setPokemonGuess(target.value)}
        />

        <button className="button" disabled={pokemonWin} onClick={guessThePokemon}>
          Guess
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default App;
