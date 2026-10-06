async function fetchPokemon(offset) {
  let response = await fetch (`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
  let data = await response.json();
  return data.results;
}

async function fetchPokemonDetails(url) {
  let response = await fetch(url);
  let data = await response.json();
  
  return data;
}

