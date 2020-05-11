import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../components/Home'
import Register from '../components/Register'
import Profile from '../components/Profile'
import Login from '../components/Login'
import Shop from '../components/Shop'
import Checkout from '../components/Checkout'

export default (props) => (
  <Switch>
    <Route exact path="/" 
    render={ (routeProps) => {
      // An example of adding props to a component rendered by react router
      return <Home 
                { ...routeProps }
                show={true}
                currentUser={props.currentUser}
                setCurrentUser={props.setCurrentUser}
              /> 
    } }/>


    <Route path="/login" render={ (routeProps) => {
      // An example of adding props to a component rendered by react router
      return <Login 
                { ...routeProps }
                show={true}
                currentUser={props.currentUser}
                setCurrentUser={props.setCurrentUser}
              /> 
    } } />
    <Route path="/profile" render={(routeProps)=>{
      return <Profile 
                { ...routeProps }
                currentUser={props.currentUser}
                setCurrentUser={props.setCurrentUser}
              /> 
    }} />
    <Route path="/register" component={ Register } />

<Route exact path="/shop" render={(routeProps)=>{
        return <Shop 
          { ...routeProps }
          currentUser={props.currentUser}
          setCurrentUser={props.setCurrentUser}
          handleAddToCart={props.handleAddToCart}
        />

    }} />


    <Route path="/shop/:id" render={(routeProps)=>{
        return <Shop 
          { ...routeProps }
          currentUser={props.currentUser}
          setCurrentUser={props.setCurrentUser}
          handleAddToCart={props.handleAddToCart}
        />

    }} />

    <Route path="/checkout" render={(routeProps)=>{
      return <Checkout 
                { ...routeProps }
                currentUser={props.currentUser}
                setCurrentUser={props.setCurrentUser}
                cartItems={props.cartItems}
                removeCartItem={props.removeCartItem}
              /> 
    }} />



  </Switch>
)