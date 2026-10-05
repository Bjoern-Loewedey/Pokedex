function getPokemonTemplate(details) {
    return `
    <li>
    ${details.name}
    <img src=${details.sprites.front_default}>
    <p>${details.types[0].type.name}</p>
    <li>
    `;
}