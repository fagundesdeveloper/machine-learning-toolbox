var React = require('react')
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var hashHistory = ReactRouter.hashHistory
var IndexRoute = ReactRouter.IndexRoute
var Main = require('../components/Main')
var Home = require('../components/Home')
var PromptContainer = require('../containers/PromptContainer')
var ConfirmBattleContainer = require('../containers/ConfirmBattleContainer')
var ResultsContainer = require('../containers/ResultsContainer')

var routes = (
<Router history={hashHistory}>
  <Route path='/' component={Main}>
    <IndexRoute component={Home} />
    <Route path='playerOne' header='Player One' component={PromptContainer} />
    <Route path='playerTwo/:playerOne' header='Player Two' component={PromptContainer} />
    <Route path='battle' component={ConfirmBattleContainer} />
    <Route path='results' component={ResultsContainer} />
  </Route>
</Router>
)

// / import React from 'react'
// import { Route, IndexRoute } from 'react-router'

// import App from './pages/App'
// import PostsIndex from './pages/PostsIndex'
// import PostsNew from './pages/PostsNew'
// import PostsShow from './pages/PostsShow'
// import SignIn from './pages/SignIn'
// import SignUp from './pages/SignUp'
// import ForgotPwd from './pages/ForgotPwd'
// import ValidateEmail from './pages/ValidateEmail'
// import Profile from './pages/Profile'

// export default (
//   <Route path="/" component={App}>
//     <IndexRoute component={PostsIndex} />
//     <Route path="posts/new" component={PostsNew} />
//     <Route path="posts/:id" component={PostsShow} />
//     <Route path="/signin" component={SignIn} />
//     <Route path="/signup" component={SignUp} />
//     <Route path="/forgotPwd" component={ForgotPwd} />
//     <Route path="/validateEmail/:token" component={ValidateEmail} />
//     <Route path="/profile" component={Profile} />
//   </Route>
// )
