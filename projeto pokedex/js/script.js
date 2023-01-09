const PokemonName = document.querySelector('.pokemon_name')
const PokemonNumber = document.querySelector('.pokemon_number')
const PokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const BtnPrev = document.querySelector('.btn-prev')
const BtnNext = document.querySelector('.btn-next')

let searchPokemon = 25;

let fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){

    const data = await APIResponse.json();

    return data;
    
    }
}
const renderPokemon = async (pokemon) => {

    PokemonName.innerHTML = 'Carregando...';
    PokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
    PokemonImage.style.display = 'block';
    PokemonName.innerHTML = data.name;
    PokemonNumber.innerHTML = data.id;
    PokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    input.value = '';
    searchPokemon = data.id;
  } else {
    PokemonImage.style.display = 'none';
    PokemonName.innerHTML = 'Não Encontrado';
    PokemonNumber.innerHTML = '';
  }
}

form.addEventListener("submit", (event) => {
   
    event.preventDefault();

    renderPokemon(input.value.toLowerCase())
    
})
BtnPrev.addEventListener("click", () => {
    if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
})
BtnNext.addEventListener("click", () => {
   searchPokemon += 1;
   renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);