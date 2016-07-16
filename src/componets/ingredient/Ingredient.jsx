import {'react'}
import {'react-dom'}

class Ingredient extends Component{
	// static contextTypes = {
	// 	router: PropTypes.object
	// }
	
	// componentWillMount() {
	//     this.props.resetMe()  
	// }

	// componentWillReceiveProps(nextProps) {
	      
	// },
	//use props to pass in disbale: true and onChange... so that one component can be used fof all
	render(){
		<form>
			<fieldset>
				<legend>Nutrional Facts</legend>
				Name:<br>
				<input type="text" name= "name" value="Nom nom"><br>
				Price:<br>
				<input type="text" name="price" value="Cheap"><br>
				Serving Size:<br>
				<input type="text" name="serving_size" value="in Grams"><br>
				Calories:<br>
				<input type="text" name="calories" value="calories"><br>
				Fat Calories:<br>
				<input type="text" name="fat_calories" value="chubby bunny"><br>
				Total Fat:<br>
				<input type="text" name="total_fat" value=""><br>
				Saturated Fat:<br>
				<input type="text" name="saturated_fat" value=""><br>
				Trans Fat:<br>
				<input type="text" name="trans_fat" value=""><br>
				Cholesterol:<br>
				<input type="text" name="cholesterol" value=""><br>
				Sodium:<br>
				<input type="text" name="sodium" value=""><br>
				Total Carbohydrates:<br>
				<input type="text" name="carbohydrates" value=""><br>
				Fiber:<br>
				<input type="text" name="fiber" value=""><br>
				Sugar:<br>
				<input type="text" name="sugar" value=""><br>
				Vitamins:<br>
				<input type="text" name="vitamins" value="% DV 2,000 calorie diet"><br>
				Ingredients:<br>
				Direction:<br>
				Notes:<br>
				<input type="submit" value="Submit"><br>
			</fieldset>
		</form>
	}
}

export default Ingredient