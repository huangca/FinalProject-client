import axios from 'axios'

//const REACT_APP_API_URL = "http://localhost:3001/api/v1"
const REACT_APP_API_URL = "https://cryptic-retreat-08986.herokuapp.com/api/v1"

export default class CategoryModel{
	static getCategory(){
		let request=axios.get(`${REACT_APP_API_URL}/category/categories`)
		return request;
	}

}