async function searchPokemon() {
    let searchInput = document.querySelector('[data-id="search-input"]');
    let searchValue = searchInput.value;

    if (searchValue.length < 3) {
        let notFound = document.querySelector('[data-id="not-found"]');
        notFound.innerHTML = "Please enter at least 3 characters.";
        return;
    }

    let notFound = document.querySelector('[data-id="not-found"]');
    notFound.innerHTML = "";

    let filteredPokemon = filterPokemon(allPokemons, searchValue);

    if (filteredPokemon.length === 0) {
        showNoSearchResults();
        return;
    }

    showSearchResults(filteredPokemon);
}



function filterPokemon(allPokemon, searchValue) {
    let filteredPokemon = allPokemon.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    return filteredPokemon;
}


function showNoSearchResults() {
    let notFound = document.querySelector('[data-id="not-found"]');
    notFound.innerHTML = "No Pokemon found.";
}


async function showSearchResults(filteredPokemon) {
    let pokemonList = document.querySelector('[data-id="pokemon-list"]');
    pokemonList.innerHTML = "";

    for (let i = 0; i < filteredPokemon.length; i++) {
        let details = await fetchPokemonDetails(filteredPokemon[i].url);
        let template = getPokemonTemplate(details);
        pokemonList.innerHTML += template;
    }
}