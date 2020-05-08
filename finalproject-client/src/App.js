import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Navbar from './components/Navbar';
import Routes from './config/routes';
import UserModel from './models/user';


 class App extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
    currentUser: localStorage.getItem('uid'),
    cartItems:[]
  }
  }

  componentWillMount() {

    if (localStorage.getItem('cartItems')) {
      this.setState({ cartItems: JSON.parse(localStorage.getItem('cartItems')) });
    }
  }




  setCurrentUser = (userId) => {
    this.setState({ currentUser: userId })
    localStorage.setItem('uid', userId)
  }
  removeCartItem=()=>{
     //event.preventDefault();
     console.log("remove cart!!!!")
    localStorage.removeItem('cartItems')
    this.setState({
      cartItems:[]
    })

  }

  logout = (event) => {
    event.preventDefault();
    this.setState({
      cartItems:[]
    })
    localStorage.removeItem('uid')
    localStorage.removeItem('cartItems')
    UserModel.logout()
      .then(res => {
        console.log(res)
        this.setState({ currentUser: null })
        this.props.history.push('/login')
      })
      .catch(err => console.log(err))
  }

  handleAddToCart = (e, product) => {
    e.preventDefault();
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      //debugger;

      // cartItems.forEach(cp => {
      //   if (cp._id === product._id) {
      //     if(cp.count+1>cp.stock){
      //       alert("no enough !")
      //         return ;
      //     }
      //     cp.count += 1;
      //     productAlreadyInCart = true;
      //   }
      // });  // "return only end one function in this case will end forEach() but not handleAddToCart()"

      for(let cp of cartItems){
        if (cp._id === product._id) {
          if(cp.count+1>cp.stock){
            alert("no enough !")
              return ;
          }
          cp.count += 1;
          productAlreadyInCart = true;
        }
      }

      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  }


  handleRemoveFromCart=(e, product)=>{
    this.setState(state => {
      const cartItems = state.cartItems.filter(a => a._id !== product._id);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    })
  }



  render() {
    return (
      
       <div>
        <Navbar  currentUser={this.state.currentUser} 
          logout={this.logout}  
          cartItems={this.state.cartItems} 
          handleRemoveFromCart={this.handleRemoveFromCart}
          />
     <Routes currentUser={this.state.currentUser} 
            setCurrentUser={this.setCurrentUser} 
            handleAddToCart={this.handleAddToCart}
            cartItems={this.state.cartItems}
            removeCartItem={this.removeCartItem}
            />
          {/*TODO:Router and Navbar*/}
      </div> 
  
    );
  }
}


export default withRouter(App);
