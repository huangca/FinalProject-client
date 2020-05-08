import React from 'react';
import UserModel from '../models/user'
import OrderModel from '../models/order'

import util from '../util'
import { Modal } from 'react-bootstrap'; //will use modal to display order detail,so will import order model later, but now just import but not use

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
				this.state = {
    // store the default values for the fields in the register form
		    id:this.props.currentUser,
		    username: '',
		    address:'',
		    readonly:true,
        show:false,  //will use it later for order display
        orders:[],
        selectOrder:'',
        orderDetail:[]
  }

  	UserModel.getUser(this.props.currentUser)
  		.then(res=>{
  			this.setState({
  				email:res.data.email,
  				address:res.data.address
  			})
  		})
  		.catch(err=>{
  			console.log(err)
  		})

    OrderModel.getOrders(this.props.currentUser)
      .then(res=>{
        this.setState({
          orders:res.data
        })
      })
      .catch(err=>console.log(err))


	}


handleSubmit = (event) => {
    event.preventDefault()
    UserModel.update(this.state)
    	.then(res=>{
    		window.location.reload(false);
    	})
    	.catch(err=>console.log(err))
        event.preventDefault()
  }

	handleEdit=(event)=>{
		console.log("edit")
		this.setState({
		readonly:false
		})
	}

  handleChange = (event) => {
    // console.log(event)
    // set state with the value from the input
    this.setState({
        [event.target.name]: event.target.value
    })
  }


handleSubmit = (event) => {
    event.preventDefault()
    UserModel.update(this.state)
    	.then(res=>{
    		window.location.reload(false);
    	})
    	.catch(err=>console.log(err))
        event.preventDefault()
  }

handleOrderDetail=(event)=>{
   event.preventDefault()
    //console.log(event.target.id)
    this.setState({
        selectOrder:event.target.id,
        show:true
    })
    //console.log(this.state.selectOrder)
  OrderModel.getOrderDetail(event.target.id)
    .then(res=>{
      this.setState({
        orderDetail:res.data
      })
    })
    .catch(err=>console.log(err))
}

  handleClose=()=>{
  this.setState({
    show:false
  })
}



	render() {
		const Button = () => (
				<button className="btn btn-primary float-right" type="submit">update</button>
				)

		const EditButton=()=>(
			<button onClick={this.handleEdit}>
			  edit
			</button>
			)

    const ShowDetail=(props)=>(
        <Modal show={this.state.show} onHide={this.handleClose}>
          <div>
              <ul style={{ marginLeft: -25 }}>
                  {props.orderDetail.map(item => (
                      <li key={item._id}>
                          <b>{item.product.name}</b>
                          {item.quantity} X {util.formatCurrency(item.price)}
                      </li>))
                  }
              </ul>

              <b>Sum: {util.formatCurrency(props.orderDetail.reduce((a, c) => (a + c.price * c.quantity), 0))}</b>
              <br/>
              <b>Status: In prossing</b>

          </div>

        </Modal>
    )



		return (
			<div className="container mt-4">
        <div className="row">
          <div className="col-xl-4 offset-xl-4">
            <h4 className="mb-3">profile</h4>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    onChange={this.handleChange} 
                    className="form-control form-control-lg" 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={this.state.email}
                    readOnly={this.state.readonly}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input onChange={this.handleChange} className="form-control form-control-lg border-0" type="text" id="address" name="address" value={this.state.address} readOnly={this.state.readonly} />
              </div>

             {this.state.readonly?null:<Button />}
             {this.state.readonly?<EditButton />:null}

            </form>
            {this.state.orders.map((order)=>(
              <>
                <label>order number:</label>
                <a id={order._id} href="#" onClick={this.handleOrderDetail}>{order._id}  
                </a>
                <label>order date:{order.createdAt}</label>
                {this.state.selectOrder==order._id?<ShowDetail orderDetail={this.state.orderDetail} />:null}
                  </>
                
            ))}

          </div>
            
        </div>
      </div>

/* will disply order and order detail here later */
        
		);
	}
}
