import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
//import Modal from 'react-responsive-modal';
//import './Navbar.css';
import Cart from './Cart';



 class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          showCart:false
        }
      
    }

    
handleCartOpen=(event)=>{
  this.setState({
    showCart:true
  })
}

handleCartClose=(event)=>{
  this.setState({
    showCart:false
  })
}

	render() {

      


    
		return (
      <div className="mynav">
			<nav className="navbar navbar-expand-md ">
		<div className="container">
          <Link className="navbar-brand"  to="/">Shop</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">Home</NavLink>
              </li>
              { this.props.currentUser ? 
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/shop">Shop</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/logout" onClick={ this.props.logout }>Logout</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={this.handleCartOpen}>Cart</a>
                    <label>count{this.props.cartItems.length}</label>
                  </li>
                </>
              :
                <>
                                
                   <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                  </li>
                               
                </>
              }
            </ul>
          </div>
          {this.state.showCart?<Cart show={this.state.showCart} cartItems={this.props.cartItems} handleRemoveFromCart={this.props.handleRemoveFromCart} handleCartClose={this.handleCartClose}/>:null}
        </div>

			</nav>

            </div>
		);
	}
}
export default Navbar;