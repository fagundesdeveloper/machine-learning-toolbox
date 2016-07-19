import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router';

class Ingredient extends Component{
	componentWillMount() {
    	this.props.fetchPosts();
  	}

	render(){
		const { facts, loading, error } = this.props.ingredientInformation;

		if (this.props.loading){
			return(
				<div><h3>Loading</h3></div>
				)
		}
		return(
		


	
	return (
      <div className="container">
        <h1>Posts</h1>
        <ul className="list-group">
          {this.renderPosts(posts)}
        </ul>
      </div>
    );
	renderIngredient(information){
		return 
	}
































	/* static contextTypes = {
	// 	router: PropTypes.object
	// }
	
	// componentWillMount() {
	//     this.props.resetMe()  
	// }

	// componentWillReceiveProps(nextProps) {
	      
	// },
	//use props to pass in disbale: true and onChange... so that one component can be used fof all
	*/
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class PostsForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newPost.post && !nextProps.newPost.error) {
      this.context.router.push('/');
    }
  }

  renderError(newPost) {
    if(newPost && newPost.error && newPost.error.message) {
      return (
        <div className="alert alert-danger">
          {newPost ? newPost.error.message : ''}
        </div>
      );
    } else {
      return <span></span>
    }
  }
render() {
    const {asyncValidating, fields: { title, categories, content }, handleSubmit, submitting, newPost } = this.props;

    return (
      <div className="container">
      {this.renderError(newPost)}
      <form onSubmit={handleSubmit(this.props.createPost.bind(this))}>
        <div className={`form-group ${title.touched && title.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Title*</label>
          <input type="text" className="form-control" {...title} />
          <div className="help-block">
            {title.touched ? title.error : ''}
          </div>
          <div className="help-block">
            {asyncValidating === 'title'? 'validating..': ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Categories*</label>
          <input type="text" className="form-control" {...categories} />
          <div className="help-block">
            {categories.touched ? categories.error : ''}
          </div>
        </div>
-------------------------------
	function IngredientView (props) {
  const {
    post,
    isLoading,
    isEditing,
    handleOnEdit,s
    handleOnSubmit
  } = props



	var Input = React.createClass({
  getInitialState: function() {
    return {typed: ''};
  },
  onChange: function(event) {
    this.setState({typed: event.target.value});
  },
  render: function() {
    return <div>
        <input type="text" onChange={this.onChange()}/>  

        You typed: <code>{this.state.typed}</code>
      </div>
  }

	render(){
		return(
		<form>
			<fieldset>
				<legend>Nutrional Facts</legend>
				Name:<br/>

				<input type="text" name= "name" defaultValue="Nom nom" onChange={this.handleChange}/><br/>
				Price:<br/>

				<input type="text" name="price" value="Cheap"/><br/>
				Serving Size:<br/>

				<input type="text" name="serving_size" value="in Grams"/><br/>
				Calories:<br/>
				<input type="text" name="calories" value="calories"/><br/>
				Fat Calories:<br/>
				<input type="text" name="fat_calories" value="chubby bunny"/><br/>
				Total Fat:<br/>

				<input type="text" name="total_fat" value=""/><br/>
				Saturated Fat:<br/>

				<input type="text" name="saturated_fat" value=""/><br/>
				Trans Fat:<br/>
				
				<input type="text" name="trans_fat" value=""/><br/>
				Cholesterol:<br/>
				<input type="text" name="cholesterol" value=""/><br/>
				Sodium:<br/>
				<input type="text" name="sodium" value=""/><br/>
				Total Carbohydrates:<br/>
				<input type="text" name="carbohydrates" value=""/><br/>
				Fiber:<br/>
				<input type="text" name="fiber" value=""/><br/>
				Sugar:<br/>
				<input type="text" name="sugar" value=""/><br/>
				Vitamins:<br/>

				<input type="text" name="vitamins" value="% DV 2,000 calorie diet"/><br/>
				Ingredients:<br/>
				Direction:<br/>
				Notes:<br/>
				<input type="submit" value="Submit" />
			
			</fieldset>
		</form>
		)
	}
}

export default Ingredient