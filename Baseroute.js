import React, { Component } from 'react';    
     
class Baseroute extends Component {
    constructor(props) {
    super(props);
    this.state = {
        selectedpokemon: null,
        types: [],
        species: [],
        game_indices: []
    }
}


    async componentDidMount() {
     const res = 
        await  fetch(`https://pokeapi.co/api/v2/${this.props.match.params.name}/`, {cache: "force-cache"})
        const json = await res.json()

  
console.log(types)
     const typesPromises = json.types.map(async (t) => {
      const data = await fetch(t.types.url, {cache: "force-cache"} )
      const json = await data.json() 
      return json
    })

  const types = await Promise.all(typesPromises)
  
  const speciesPromises = json.species.map(async (s) => {
    const data = await fetch(s.species.url, {cache: "force-cache"} )
    const json = await data.json() 
    return json
  })

  const species = await Promise.all(speciesPromises)

  const game_indicesPromises = json.game_indices.map(async (g) => {
    const data = await fetch(g.game_indices.url, {cache: "force-cache"} )
    const json = await data.json() 
    return json
  })

  const game_indices = await Promise.all(game_indicesPromises)

  this.setState({selectedPokemon: json, game_indices: game_indices, species: species, types: types})
  }


  render() {
      return (
          <div>
              {this.state.selectedPokemon &&
                    <div className="result">
                     <img src={this.state.selectedPokemon.sprites.front_default}/>
                    <img src={this.state.selectedPokemon.sprites.front_shiny}/>
                    
                    <h1 class="types">Types</h1>
                    <ul>
                    {this.state.types.map(t => <p>{t.name}</p>)}
                    </ul>
                    <h1 class="species">Species</h1>
                    <ul>
                    {this.state.species.map(s => <p>{s.name}</p>)}
                    </ul>
                    <h1 className="game_indices">Game Indices</h1>
                    <ul>
                    {this.state.game_indices.map(g => <p>{g.name}</p>)}
                    </ul>
                    </div>
              }
            </div>
      );
  }
}

  export default Baseroute; 
