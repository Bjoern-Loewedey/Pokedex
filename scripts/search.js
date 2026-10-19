function searchPokemon() {
    let searchInput = document.querySelector('[data-id="search-input"]');
    let searchValue = searchInput.value;
    let notFound = document.querySelector('[data-id="not-found"]');

    if (!checkSearchLength(searchValue, notFound)) {
        return;
    }

    notFound.innerHTML = "";

    hideLoadMoreButton();

    let filteredPokemon = filterPokemon(allPokemons, searchValue);

    handleSearchResults(filteredPokemon);
}


function hideLoadMoreButton() {
    let loadMoreButton = document.querySelector('[data-id="load-more-button"]');
    loadMoreButton.hidden = true;
}


function showLoadMoreButton() {
    let loadMoreButton = document.querySelector('[data-id="load-more-button"]');
    loadMoreButton.hidden = false;
}


function resetSearch() {
    let pokemonList = document.querySelector('[data-id="pokemon-list"]');
    pokemonList.innerHTML = "";

    for (let i = 0; i < completeDetails.length; i++) {
        pokemonList.innerHTML += getPokemonTemplate(completeDetails[i]);
    }

    showLoadMoreButton();
}


function checkSearchLength(searchValue, notFound) {
    if (searchValue.length === 0) {
        notFound.innerHTML = "";
        resetSearch();
        return false;
    }

    if (searchValue.length < 3) {
        notFound.innerHTML = "Please enter at least 3 characters.";
        return false;
    }

    return true;
}


function searchOnEnter(event) {
    if (event.key === "Enter") {
        searchPokemon();
    }
}


function handleSearchResults(filteredPokemon) {
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