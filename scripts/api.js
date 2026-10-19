async function fetchPokemonDetails(url) {
  let response = await fetch(url);
  let data = await response.json();

  return data;
}


async function fetchAllPokemon() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon");
  let data = await response.json();

  let totalPokemon = data.count;
  let allPokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemon}`);
  let allPokemonData = await allPokemonResponse.json();

  return allPokemonData.results;
}