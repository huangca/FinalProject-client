import axios from 'axios'

//const REACT_APP_API_URL = "http://localhost:3001/api/v1"
const REACT_APP_API_URL = "https://cryptic-retreat-08986.herokuapp.com/api/v1"

export default class OrderModel{
	static createOrder(data){
		let request=axios.post(`${REACT_APP_API_URL}/order/createorder`,data)
		return request;
	}
	static getOrders(data){
		let request=axios.get(`${REACT_APP_API_URL}/order/getorders/${data}`,data)
		return request;
	}
	static getOrderDetail(data){
		console.log(data)
		let request=axios.get(`${REACT_APP_API_URL}/order/getorderdetail/${data}`)
		return request;
	}
}