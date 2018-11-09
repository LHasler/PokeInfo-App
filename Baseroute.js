import React, { Component } from 'react';    
     
class Baseroute extends Component {
    constructor(props) {
    super(props);
    this.state = {
        selectedpokemon: null,
        game_indices: [],
        types: [],
        held_items: []
    }
}

    async componentDidMount() {
     const res = 
        await  fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.name}/`, {cache: "force-cache"})
        const json = await res.json()

  
    const typesPromises = json.types.map(async (t) => {
    const data = await fetch(t.type.url, {cache: "force-cache"} )
    const json = await data.json() 
    return json
    })

      const types = await Promise.all(typesPromises)
  
    const held_itemsPromises = json.held_items.map(async (h) => {
    const data = await fetch(h.item.url, {cache: "force-cache"} )
    const json = await data.json() 
    return json
    })

      const held_items = await Promise.all(held_itemsPromises)

    const game_indicesPromises = json.game_indices.map(async (g) => {
    const data = await fetch(g.version.url, {cache: "force-cache"} )
    const json = await data.json() 
    return json
    })

      const game_indices = await Promise.all(game_indicesPromises)

  this.setState({selectedPokemon: json, game_indices: game_indices, types: types, held_items:held_items})

  }


  render() {
      return (
          <div className="results">
              {this.state.selectedPokemon &&
                    <div className="result">
                      <img className= "sprite" src={this.state.selectedPokemon.sprites.front_default}/>
                      <img className="shiny" src={this.state.selectedPokemon.sprites.front_shiny}/>
                        <h1 className="types">Type</h1>
                          <ul>
                            {this.state.types.map(t => <p>{t.name}</p>)}
                          </ul>
                        <h1 className="held_items">Items Held on Capture (if any)</h1>
                          <ul>
                            {this.state.held_items.map(h => <p>{h.name}</p>)}
                          </ul>
                        <h1 className="game_indices">Game Index</h1>
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
