let completeDetails = [];
let offset = 0;

async function init() {
    let pokemon = await fetchPokemon(offset);
    let pokemonList = document.querySelector("ul");

    for (let i = 0; i < pokemon.length; i++) {
        let details = await fetchPokemonDetails(pokemon[i].url);

        completeDetails.push(details);

        let template = getPokemonTemplate(details);
        pokemonList.innerHTML += template;
        console.log(template)
    }
}

init();


async function openPokemonDialog(pokemonId) {
    let details = completeDetails.find(pokemon => pokemon.id === pokemonId);

    if (details === undefined) {
        offset += 20;
        let pokemon = await fetchPokemon(offset)

        for (let i = 0; i < pokemon.length; i++) {
            let details = await fetchPokemonDetails(pokemon[i].url)
            completeDetails.push(details);
        }

        details = completeDetails.find(pokemon => pokemon.id === pokemonId);
        
    }

    let dialogTemplate = getPokemonDialogTemplate(details);
    let dialog = document.querySelector("dialog");
    dialog.innerHTML = dialogTemplate;
    dialog.showModal();
};


function closePokemonDialog() {
    let dialog = document.querySelector("dialog");
    dialog.close();
};

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