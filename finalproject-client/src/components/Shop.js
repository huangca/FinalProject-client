import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import  CategoryDetail from './CategoryDetail';
import CategoryModel from '../models/category';
import ProductModel from '../models/product';

export default class Shop extends React.Component {

	constructor(props) {
		super(props);
		this.state={
			categories:[],
			selectCategoryId:'',
			products:[],
			filteredProducts:[]
		}

		CategoryModel.getCategory()
			.then(res=>{
				this.setState({
					categories:res.data
				})
			})
			.catch(err=>console.log(err))

		ProductModel.getAllProduct()
			.then(res=>{
				this.setState({
					products:res.data
				})
			})
			.catch(err=>console.log(err))


	}

	componentDidUpdate(prevprops,prevstate){
		if(prevstate.selectCategoryId!==this.props.match.params.id){

			this.setState({
				selectCategoryId:this.props.match.params.id
			})
			if(this.state.selectCategoryId!==''){
					console.log("here")

					let tempProducts=this.state.products.filter((product)=>product.category===this.state.selectCategoryId)
					this.setState({
						filteredProducts:tempProducts
					})



			}
		}

	}



	render() {
		return (
			<div>
			<div class="container">
			<div className="row ">
			<div className="col-">
				<div className="container">
					<div className="left-sidebar">
						<h2>Category</h2>
						<div class="panel-group category-products" id="accordian">
							<div class="panel panel-default">
								<div class="panel-heading">

					{/*   <h2> <a className="nav-link" id={city._id} href="#" onClick={()=>{ this.handleClick(city)}}>{city.name}</a></h2> */}
					      <NavLink className="nav-link" to={"/shop"}>all</NavLink>
					    </div>
					  </div>
					  
					
				
			{this.state.categories.map((category)=>(
				
					
					  <div class="panel panel-default">
								<div class="panel-heading">
					{/*   <h2> <a className="nav-link" id={city._id} href="#" onClick={()=>{ this.handleClick(city)}}>{city.name}</a></h2> */}
					      <NavLink className="nav-link" to={"/shop/"+category._id}>{category.name}</NavLink>
					    </div>
					  </div>
					  
					
				

				))}
						</div>
					</div>
				</div>
			</div>
			<br></br>

			
			
				<div className="col-lg">
					{this.state.selectCategoryId?<CategoryDetail currentUser={this.props.currentUser}
                						setCurrentUser={this.props.setCurrentUser}
                						handleAddToCart={this.props.handleAddToCart}
                						products={this.state.filteredProducts}
                						selectCategoryId={this.state.selectCategoryId}
                						/>:<CategoryDetail currentUser={this.props.currentUser}
                						setCurrentUser={this.props.setCurrentUser}
                						handleAddToCart={this.props.handleAddToCart}
                						products={this.state.products}
                						selectCategoryId={this.state.selectCategoryId}
                						/>}	

			    </div>
			</div>


			</div>
			</div>
		);
	}
}
