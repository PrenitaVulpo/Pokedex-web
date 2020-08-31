const pokemonFetching = () => {
    const pokemonURLFetch = id => 'https://pokeapi.co/api/v2/pokemon/'+id;

    const promisses = [];

    for (i=1;i<=151;i++){
        promisses.push(fetch(pokemonURLFetch(i)).then(response => response.json()))
    }

    Promise.all(promisses)
    .then(pokemons =>{
        const pokemonLI = pokemons.reduce((acumulador, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            pokeName = pokemon.name
            pokeId = pokemon.id
            pokeType = pokemon.types.map(typeInfo=>typeInfo.type.name)
            pokeImg = 'https://pokeres.bastionbot.org/images/pokemon/'+pokeId+'.png'
            acumulador += '<li class="card '+pokeType[0]+'">'+
                '<img class="card-image" alt="'+pokeName+'" src="'+pokeImg+'"/>'+
                '<h2 class="card-title">'+pokeName+'</h2>'+
                '<p class="card-subtitle">'+pokeType.join(' | ')+'</p>'+
            '</li>'
            return acumulador
        }, '')

        const ul = document.querySelector('[data-js="pokedex"]')
        ul.innerHTML = pokemonLI
        console.log(ul)
    })
}

pokemonFetching()