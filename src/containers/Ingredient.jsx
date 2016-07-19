import PostsForm from '../components/PostsForm.js';
import {
  createPost, createPostSuccess, createPostFailure, resetNewPost, validatePostFields, validatePostFieldsSuccess, validatePostFieldsFailure
}
from '../actions/posts';
import {
  reduxForm
}
from 'redux-form';


const mapDispatchToProps = (dispatch) => {
  return {
    createPost: validateAndCreatePost,
    resetMe: () => {
      dispatch(resetNewPost());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    newPost: state.posts.newPost
  };
}


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  asyncValidate,
  asyncBlurFields: ['title'],
  validate



}, mapStateToProps, mapDispatchToProps)(PostsForm);

import PostDetails from '../components/PostDetails.js';
import { fetchPost, fetchPostSuccess, fetchPostFailure, resetActivePost, resetDeletedPost } from '../actions/posts';
import { connect } from 'react-redux';



function mapStateToProps(globalState, ownProps) {
  return { activePost: globalState.posts.activePost, postId: ownProps.id };
}

const mapDispatchToProps = (dispatch) => {
  return {
  	 fetchPost: (id) => {
    	dispatch(fetchPost(id))
      	.then((data) => 
          {
          	!data.error ? dispatch(fetchPostSuccess(data.payload)) : dispatch(fetchPostFailure(data.payload));
          }) 
  	 },
     resetMe: () =>{
      //clean up both activePost(currrently open) and deletedPost(open and being deleted) states
        dispatch(resetActivePost());
        dispatch(resetDeletedPost());
     }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);