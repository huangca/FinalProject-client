import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import UserModel from '../models/user'

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
    // store the default values for the fields in the register form
	    email: '',
	    password: '',
	    address:'',
	    show:true
    
  }
	}

  handleChange = (event) => {
    // console.log(event)
    // set state with the value from the input
    this.setState({
        [event.target.name]: event.target.value
    })
  }



handleSubmit = (event) => {
    // stop the default form event from firing
    event.preventDefault()
    // make an axios call to the API register route
    UserModel.create(this.state)
      .then(res => {
        this.setState({
          email: '',
          password: '',
          address:'',
          showModal:true
        })
        this.props.history.push('/')
      })
      .catch(err => {
        if(err.message.includes('400')){
          alert('This email already exists. Please try with new one')
        }
        else console.log(err)
      })
  }


handleClose=()=>{
this.props.history.push('/')
}



  render() {
   
  //console.log(this.state.cities)

    return (

      <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>User Register</Modal.Title>
        </Modal.Header>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Email</label>
                <input 
                    onChange={this.handleChange} 
                    className="form-control form-control-lg" 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={this.state.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Password</label>
                <input onChange={this.handleChange} className="form-control form-control-lg" type="password" id="password" name="password" value={this.state.password} />
              </div>
              <div className="form-group">
                <label htmlFor="name">address</label>
                <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="address" name="address" value={this.state.address} />
              </div>
              <button className="btn btn-primary float-right" type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
      </Modal>

    );
  }
}
