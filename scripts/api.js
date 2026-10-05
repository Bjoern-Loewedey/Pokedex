async function fetchPokemon() {
  let response = await fetch ("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
  let data = await response.json();
  return data.results;
}

async function fetchPokemonDetails(url) {
  let response = await fetch(url);
  let data = await response.json();
  
  return data;
}