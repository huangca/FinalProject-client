import React from 'react';
import './Home.css';
//import './w3.css';
export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}


	handleStart=(e)=>{
		e.preventDefault();
		console.log(this.props.currentUser)
		if(this.props.currentUser){
			 this.props.history.push('/shop')
		}
		else{
			this.props.history.push('/register')
		}
	}

	render() {
		return (
			<>
			
			<div class="w3-display-container w3-animate-opacity w3-text-aqua">
				<div class="text-center">
					<img src="./home_cart.jpg" />
				</div>
			 <div class="inner cover">
            <h1 class="cover-heading text-center align-middle">Ecommerce.</h1>
            <p class="lead text-center align-middle">Small business or personal business ecommerce website.</p>
            <p class="lead">
            <div class="text-center">
              	<a href="#" onClick={this.handleStart} class="btn btn-lg btn-secondary">Start Shopping</a>
             </div>
            </p>
          </div>
			  
			</div>


			</>
		);
	}
}
