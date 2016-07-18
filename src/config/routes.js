import React from 'react'
import { Route, Router, IndexRoute, hashHistory } from 'react-router'
import App from '../components/App'
import Home from '../components/Home'
import Ingredient from '../components/ingredient/Ingredient'

export default (
<Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="ingredient" component={Ingredient} />
  </Route>
</Router>
)
