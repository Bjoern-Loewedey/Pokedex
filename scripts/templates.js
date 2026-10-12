function getPokemonTemplate(details) {
    console.log(details)
    let types = "";

    for (let i = 0; i < details.types.length; i++) {
        types += details.types[i].type.name + " ";
    }

    return `
    <li data-pokemon-id="${details.id}" onclick="openPokemonDialog(${details.id})">
    ${details.name}
    <img src=${details.sprites.front_default}>
    <p>${types}</p>
    <p>${details.id}</p>
    </li>
    `;
}

function getPokemonDialogTemplate(details) {
    return `
    <img data-id="dialog-image" src="${details.sprites.other["official-artwork"].front_default}" alt="${details.name}">
    <h2 data-id="overlay-pokemon-name">${details.name}</h2>
    <p>${getPokemonTypes(details)}</p>
    <p>Attack: ${details.stats[1].base_stat}</p>
    <p>Defense: ${details.stats[2].base_stat}</p>
    <p>${(details.weight / 10).toLocaleString("de-DE")} kg</p>
    <p>${(details.height / 10).toLocaleString("de-DE")} Meter</p>
    <button data-id="close-dialog-button" onclick="closePokemonDialog()">Close</button>
    <button data-id="next-button" onclick="nextPokemon(${details.id})">Next</button>
    <button data-id="prev-button" ${isPreviousDisabled(details.id)} onclick="prevPokemon(${details.id})">Previous</button>
    `;
}


function isPreviousDisabled(pokemonId) {
    if (pokemonId === 1) {
        return `disabled`;
    }

    return ``;
}


function getPokemonTypes(details) {
    let types = "";

    for (let i = 0; i < details.types.length; i++) {
        types += details.types[i].type.name + " ";
    }

    return types;

}