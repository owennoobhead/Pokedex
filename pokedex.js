const searchButton = document.getElementById("search-button");
const randomButton = document.getElementById("random-button");
const pokemonName = document.getElementById("pokemonName");
const pokemonDetails = document.getElementById("pokemonDetails");

const apiURL = "https://pokeapi.co/api/v2/pokemon/";



const displayPokemonData = (pokemon) => {

  const regularImg = pokemon.sprites.front_default
  const shinyImg = pokemon.sprites.front_shiny 
  let isShiny = false; 


  const pokemonHTML = `
    <img id="pokemon-image" src="${regularImg}" alt="${pokemon.name}">
    <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
    <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
    <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
    <p><strong>Type:</strong> ${pokemon.types
      .map((typeInfo) => typeInfo.type.name)
      .join(", ")} </p>
    `;

  pokemonDetails.innerHTML = pokemonHTML;

      const shinyToggle = document.getElementById('shiny-toggle')
      const pokemonImage = document.getElementById('pokemon-image')

      shinyToggle.addEventListener('click', () => {
        if(isShiny) {
          pokemonImage.src = regularImg;
        } else{
          pokemonImage.src = shinyImg;
        }

        isShiny = !isShiny; // Toggle state

      })

};

const getPokemonData = async (name) => {
  try {
    const response = await fetch(apiURL + name.toLowerCase());
    if (!response.ok) {
      throw new Error("Pokemon not found");
    }
    const pokemonData = await response.json();
    displayPokemonData(pokemonData);
  } catch (error) {
    console.log(error);
  }
};

const getRandomPokemonData = () => {
  const randomNum = Math.floor(Math.random() * 898) + 1;
  getPokemonData(randomNum === 1200 ? "1199" : `${randomNum}`);
};

searchButton.addEventListener("click", () => {
  getPokemonData(pokemonName.value);
});

randomButton.addEventListener("click", () => {
  getRandomPokemonData();
})

document.addEventListener("DOMContentLoaded", () => {
  getPokemonData("pikachu");
})

