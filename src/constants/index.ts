export const POKE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

export const POKEMON_IMAGE = (pokemonId: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
