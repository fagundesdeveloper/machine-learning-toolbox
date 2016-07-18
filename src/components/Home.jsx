import React, {Component} from 'react'
import {Link, Router} from 'react-router'

class  Home extends Component {
	render(){
		return (
	<Link to='/ingredient'>
		<button type='button' className='btn btn-lg'>Get Started</button>
	</Link>
	)}
}
export default Home