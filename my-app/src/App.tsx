import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {GameStart} from "./GameStart"
import {Game} from "./Game"
import {GameEnd} from "./GameEnd"

function App() {
  return (
   <BrowserRouter>
    <Switch>
      <Route exact path="/" component={GameStart}>
        <GameStart /> 
      </Route>
      <Route exact path="/Game" component={Game}>
          <Game />
      </Route>
      <Route exact path="/GameEnd" component={GameEnd}>
          <GameEnd />
      </Route>
    </Switch>
   </BrowserRouter>
  );
}

export default App;
