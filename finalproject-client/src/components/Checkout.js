import React from 'react';
import util from '../util';
import { withRouter } from 'react-router-dom';
import OrderModel from '../models/order'
import StripeCheckout from 'react-stripe-checkout'
import './Checkout.css';

class Checkout extends React.Component {


	constructor(props) {
		super(props);
	}



	handleOrder=(event)=>{
       console.log("checkout!!!!")
	// console.log(this.props.cartItems)
	// console.log(this.props.cartItems.reduce((a, c) => (a + c.price * c.count), 0))
	// console.log(this.props.currentUser)
		let data={
			user:this.props.currentUser,
			amount:this.props.cartItems.reduce((a, c) => (a + c.price * c.count), 0),
			cartItems:this.props.cartItems
		}
		
		OrderModel.createOrder(data)
			.then(res=>{
				console.log("api call!!!!!!!!!!!!!!!!!!!!!!")
				this.props.removeCartItem()
				this.props.history.push('/profile')
			})
			.catch(err=>console.log(err))

		

	}


	handleToken=(token,address)=>{
		console.log(token,address)
		let data={
			user:this.props.currentUser,
			amount:this.props.cartItems.reduce((a, c) => (a + c.price * c.count), 0),
			cartItems:this.props.cartItems
		}
		this.props.removeCartItem()

		OrderModel.createOrder(data)
			.then(res=>{
				this.props.history.push('/profile')
			})
			.catch(err=>console.log(err))
		
	}


	render() {
		//console.log(this.props.cartItems)
		const productItem=this.props.cartItems.map((item)=>(
				<div key={item._id}>
                    <img src={item.image} alt={item.name} className="img-thumbnail" />
                    <b>{item.name}</b>
                   {item.count} X {util.formatCurrency(item.price)}
                </div>
                )

			)


		const CheckoutForm = (props) => (
		 <div className="checkout">
		    <div className="checkout-container">
		     <h3 className="heading-3">Credit card checkout</h3>
		     <Input label="Cardholder's Name" type="text" name="name" />
		     <Input label="Card Number" type="number" name="card_number" imgSrc="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png" />
		      <div className="row">
		        <div className="col">
		          <Input label="Expiration Date" type="month" name="exp_date" />
		        </div>
		        <div className="col">
		          <Input label="CVV" type="number" name="cvv" />
		        </div>
		      </div>
		      <Button text="Place order" />
		    </div>
		 </div>
		);

		const Input = (props) => (
		  <div className="input">
		    <label>{props.label}</label>
		    <div className="input-field">
		      <input type={props.type} name={props.name} />
		      <img src={props.imgSrc}/>
		    </div>
		  </div>
		);

		const Button = (props) => (
		  <button className="checkout-btn" type="button" onClick={this.handleOrder} >{props.text}</button>
		);

				


		return (
	<div className="container">
        <div className="row">
          <div className="col">
          
            {productItem}
           
            <br/>
             <b>Sum: {util.formatCurrency(this.props.cartItems.reduce((a, c) => (a + c.price * c.count), 0))}</b>
          </div>
          <div className="col no-gutters">
          	{/*<CheckoutForm /> */}
          	<StripeCheckout stripeKey='pk_test_WqxGHJfozARSXsZxSnZ7DxHW00zCPm1cBd' 
				token={this.handleToken} 
				
			amount={this.props.cartItems.reduce((a, c) => (a + c.price * c.count)*100, 0)}/>
          </div>
        </div>
       </div>
		);
	}
}


export default  Checkout