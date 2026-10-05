async function init () {
    let pokemon = await fetchPokemon();
    let pokemonList = document.querySelector("ul");

    for (let i =0; i < pokemon.length; i++) {
        let details = await fetchPokemonDetails(pokemon[i].url);
        let template = getPokemonTemplate(details);
        pokemonList.innerHTML += template;
        console.log(template)
    }
}

init();