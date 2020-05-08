import React from 'react';
import { Modal } from 'react-bootstrap';
import './CategoryDetail.css'
import util from "../util";

export default class CategoryDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			show:false,
			selectProduct:''
		}


		if(this.props.selectCategoryId){
			this.props.products=this.props.products.filter((product)=>product.category===this.props.selectCategoryId)
		}
	}


handleShowProduct=(product)=>{
	this.setState({
		selectProduct:product,
		show:true
	})

}

handleShowProductOnclick=(event,product)=>{
	this.props.handleAddToCart(event, this.state.selectProduct)
	this.handleClose()
}


  handleClose=()=>{
  this.setState({
    show:false
  })
}




	render() {

			const ShowProduct=()=>(
				<Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Product Detail</Modal.Title>
        </Modal.Header>
        	<div id={this.state.selectProduct._id} class="col-md-8 offset-md-2">
			      <img src={this.state.selectProduct.image} className="img-fluid"  />
			      <h2>{this.state.selectProduct.name}</h2>
			      <p class="mb-5">{this.state.selectProduct.description}</p>
			      <section>
			       <b>{util.formatCurrency(this.state.selectProduct.price)}</b>

		          {this.state.selectProduct.stock===0?<label>out of store</label>:<button
		            className="btn btn-primary"
		            onClick={(e) => this.props.handleAddToCart(e, this.state.selectProduct)}
		          >
		            Add to cart
		          </button>}
			      </section>
			    </div>


        </Modal>
			)


		const productItem=this.props.products.map((product)=>(
			<div className="col-md-4">
		        <div className="thumbnail text-center">
		          <a
		            href="#"
		            onClick={()=>{this.handleShowProduct(product)}}
		          >
		            <img src={product.image} alt={product.name} className="img-thumbnail img-responsive" />
		            <p>{product.name}</p>
		          </a>
		          <b>{util.formatCurrency(product.price)}</b>
		          {product.stock>0?<b>stock:{product.stock}</b>:null} <br/>
		          {product.stock===0?<label>out of store</label>:<button
		            className="btn btn-primary"
		            onClick={(e) => this.props.handleAddToCart(e, product)}
		          >
		            Add to cart
		          </button>}

		        </div>
		      </div>
		))
		return (

			<div className="row">
				{productItem}
				{this.state.selectProduct?<ShowProduct />:null}
			</div>
		);
	}
}
