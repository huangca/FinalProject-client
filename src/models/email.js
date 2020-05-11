import axios from 'axios'

//const REACT_APP_API_URL = "http://localhost:3001/api/v1"
const REACT_APP_API_URL = "https://cryptic-retreat-08986.herokuapp.com/api/v1"

export default class EmailModel{
	static sendEmail(data){
		let request=axios.put(`${REACT_APP_API_URL}/email/sendemail`,data)
		return request;
	}

}