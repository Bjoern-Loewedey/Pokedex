let completeDetails = [];
let offset = 0;
let totalPokemonCards = 0;
let pokemonList;
let allPokemons = [];


async function init() {
    allPokemons = await fetchAllPokemon();
    pokemonList = document.querySelector("ul");

    totalPokemonCards = allPokemons.length;

    await loadAndRenderPokemonDetails();
}


init();

async function loadAndRenderPokemonDetails() {
    for (let i = offset; i < offset + 20 && i < allPokemons.length; i++) {
        let details = await fetchPokemonDetails(allPokemons[i].url);

        completeDetails.push(details);

        let template = getPokemonTemplate(details);
        pokemonList.innerHTML += template;
    }
}


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
    await loadAndRenderPokemonDetails();

    if (offset + 20 >= totalPokemonCards) {
        let loadMoreButton = document.querySelector('[data-id="load-more-button"]');
        loadMoreButton.hidden = true;
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
        let pokemon = allPokemons.find(pokemon => {
            return pokemon.url.endsWith(`/${pokemonId}/`);
        });

        details = await fetchPokemonDetails(pokemon.url);
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