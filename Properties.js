     
     
     
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

  this.setState({selectedPokemon: json, location: location, type: type, generation: generation, search: name})
  }