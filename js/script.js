const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const from = document.querySelector('.form')
const input = document.querySelector('.input_search')

const BtnPrev = document.querySelector('.btn-prev')
const BtnNext = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
    
}

const renderPokemon = async (pokemon) => {

    pokemonNumber.innerHTML = ''
    pokemonName.innerHTML = 'Loading...'


    const data = await fetchPokemon(pokemon)

    if(data){
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        searchPokemon = data.id
    } else {
        pokemonName.innerHTML = 'Not found!'
        pokemonImage.style.display = 'none'
    }
    input.value = ''; 
}

from.addEventListener('submit', event => {
    event.preventDefault() //bloquear o comportamento padrao.

    renderPokemon(input.value.toLowerCase())
})


BtnPrev.addEventListener('click', () => {
    if(searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

BtnNext.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)

