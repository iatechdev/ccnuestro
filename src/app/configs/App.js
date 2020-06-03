import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './../container/home/home-page.jsx';
import Register from './../container/registro-cliente/registro-clientes.jsx';
import Check from './../container/protection-elements/protection-elements.jsx';
import End from './../container/registered/registered.jsx';

const App = () => {
  return (
      <BrowserRouter>     
              <Switch>
                <Route exact path= "/" component={HomePage} />
                <Route exact path= "/registro" component={Register} />
                <Route exact path= "/registrodeproteccion" component={Check}/>
                <Route exact path= "/registroexitoso" component={End}/>
               
                <Redirect to="/"/>
              </Switch> 
      </BrowserRouter>
  );
}

export default App;