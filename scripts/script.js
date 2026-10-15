let completeDetails = [];
let offset = 0;
let totalPokemonCards = 0;


async function init() {
    let pokemon = await fetchPokemon(offset);
    let pokemonList = document.querySelector("ul");

    totalPokemonCards = pokemon.count;

    for (let i = 0; i < pokemon.results.length; i++) {
        let details = await fetchPokemonDetails(pokemon.results[i].url);

        completeDetails.push(details);

        let template = getPokemonTemplate(details);
        pokemonList.innerHTML += template;
    }
}


init();


async function openPokemonDialog(pokemonId) {
    let details = await getPokemonDetails(pokemonId);


    let dialogTemplate = getPokemonDialogTemplate(details);
    let dialog = document.querySelector("dialog");
    dialog.innerHTML = dialogTemplate;

    disableNextButton(pokemonId);

    dialog.showModal();
    disableBackgroundScroll();
}


function closePokemonDialog() {
    let dialog = document.querySelector("dialog");
    dialog.close();

    enableBackgroundScroll();
}


function nextPokemon(pokemonId) {
    let nextPokemonId = pokemonId + 1;
    openPokemonDialog(nextPokemonId);
}


function prevPokemon(pokemonId) {
    let prevPokemonId = pokemonId - 1;

    if (pokemonId > 1) {
        openPokemonDialog(prevPokemonId);
    }
}


async function loadMore() {
    offset += 20;
    let pokemon = await fetchPokemon(offset);
    let pokemonList = document.querySelector("ul");

    for (let i = 0; i < pokemon.results.length; i++) {
        let details = await fetchPokemonDetails(pokemon.results[i].url);
        completeDetails.push(details);

        let template = getPokemonTemplate(details);
        pokemonList.innerHTML += template;
    }

    if (offset + pokemon.results.length >= totalPokemonCards) {
        let loadMoreButton = document.querySelector('[data-id="load-more-button"]');
        loadMoreButton.hidden = true;
    }
}


async function loadNextPokemonBatch() {
    offset += 20;
    let pokemon = await fetchPokemon(offset);

    for (let i = 0; i < pokemon.results.length; i++) {
        let details = await fetchPokemonDetails(pokemon.results[i].url);
        completeDetails.push(details);
    }
}


function disableNextButton(pokemonId) {
    let lastPokemonId = completeDetails[completeDetails.length - 1].id;
    let nextButton = document.querySelector('[data-id="next-button"]');

    if (completeDetails.length >= totalPokemonCards &&
        pokemonId === lastPokemonId) {
        nextButton.disabled = true;
    }
}


async function getPokemonDetails(pokemonId) {
    let details = completeDetails.find(pokemon => pokemon.id === pokemonId);

    if (details === undefined) {
        await loadNextPokemonBatch();
        details = completeDetails.find(pokemon => pokemon.id === pokemonId);
    }

    return details;
}


function closeDialogOnOutsideClick(event) {
    let clickedElement = event.target;
    let pokemonCard = clickedElement.closest(".pokemon-dialog-card");

    if (pokemonCard === null) {
        closePokemonDialog();
    }
}


function disableBackgroundScroll() {
    document.body.style.overflow = "hidden";
}


function enableBackgroundScroll() {
    document.body.style.overflow = "";
}