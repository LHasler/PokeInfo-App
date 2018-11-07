import React from 'react';
import Baseroute from './Baseroute';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 
import PokeSearch from './PokeSearch';

const App = () => (
<BrowserRouter>
  <div className="container">
    <Switch>
      <Route exact path="/" component={PokeSearch} />
      <Route path= "/Baseroute" component={Baseroute} />
    </Switch>
  </div>
</BrowserRouter> 
);



export default App;
