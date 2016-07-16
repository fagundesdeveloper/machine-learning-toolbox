import {'react'}
import {'react-dom'}

class Ingredient extends Component{
	static contextTypes = {
		router: PropTypes.object
	}
	
	componentWillMount() {
	    this.props.resetMe()  
	}

	componentWillReceiveProps(nextProps) {
	      
	},
	render(){
	}
}

export default Ingredient