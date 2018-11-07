import React, { Component } from 'react';    
     
class Baseroute extends Component {
    constructor(props) {
    super(props);
    this.state = {
        selectedpokemon: null,
        location: [],
        type: [],
        generation: []
    }
}


    async componentDidMount() {
     const res = 
        await  fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.name}/`, {cache: "force-cache"})
        const json = await res.json()

  
     
     const locationPromises = json.location.map(async (l) => {
      const data = await fetch(l.location.url, {cache: "force-cache"} )
      const json = await data.json() 
      return json
    })

  const location = await Promise.all(locationPromises)
  
  const typePromises = json.type.map(async (t) => {
    const data = await fetch(t.type.url, {cache: "force-cache"} )
    const json = await data.json() 
    return json
  })

  const type = await Promise.all(typePromises)

  const generationPromises = json.generation.map(async (g) => {
    const data = await fetch(g.generation.url, {cache: "force-cache"} )
    const json = await data.json() 
    return json
  })

  const generation = await Promise.all(generationPromises)

  this.setState({selectedPokemon: json, location: location, type: type, generation: generation})
  }


  render() {
      return (
          <div>
              {this.state.selectedPokemon &&
                    <div className="result">
                     <img src={this.state.selectedPokemon.sprites.front_default}/>
                    <img src={this.state.selectedPokemon.sprites.front_shiny}/>
                    
                    <h1 class="location">Location</h1>
                    <ul>
                    {this.state.location.map(l => <p>{l.name}</p>)}
                    </ul>
                    <h1 class="type">Type</h1>
                    <ul>
                    {this.state.type.map(t => <p>{t.name}</p>)}
                    </ul>
                    <h1 className="generation">Generation</h1>
                    <ul>
                    {this.state.generation.map(g => <p>{g.name}</p>)}
                    </ul>
                    </div>
              }
            </div>
      );
  }
}

  export default Baseroute; 
