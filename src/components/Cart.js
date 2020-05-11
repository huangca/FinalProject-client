import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './Cart.css';
import util from '../util'

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
    // store the default values for the fields in the register form
	    show:false
    
  }
  //console.log(this.props.cartItems)
	}

	componentWillReceiveProps({someProp}) {
 	 this.setState({
 	 	show:this.props.show
 	 })
}

	handleClose=(event)=>{
       console.log(this.props.handleCartClose)
	this.setState({
		show:false
	})
    this.props.handleCartClose(event)
    
	}

	render() {
		const { cartItems } = this.props;
	return (
	<Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
			<div className="alert alert-info">{cartItems.length === 0? "Basket is empty" :
                    <div>You have {cartItems.length} items in the cart. <hr /></div>
                }
                {cartItems.length > 0 &&
                    <div>
                        <ul style={{ marginLeft: -25 }}>
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    <img src={item.image} className="img-cart" />
                                    <b>{item.name}</b>
                                    <button style={{ float: 'right' }} className="btn btn-danger btn-xs"
                                        onClick={(e) => this.props.handleRemoveFromCart(e, item)}>X</button>
                                    <br />
                                  <button onClick={(e)=>this.props.handleMinusToCart(e,item)}>-</button>  {item.count} <button onClick={(e)=>this.props.handleAddToCart(e,item)}>+</button> X {util.formatCurrency(item.price)}
                                </li>))
                            }
                        </ul>

                        <b>Sum: {util.formatCurrency(cartItems.reduce((a, c) => (a + c.price * c.count), 0))}
                        </b>
                        <a onClick={this.handleClose}>
                         <NavLink className="nav-link tn btn-primary" to="/checkout" >checkout</NavLink>
                         </a>
                    </div>
                }
            </div>
	</Modal>
		);
	}
}
