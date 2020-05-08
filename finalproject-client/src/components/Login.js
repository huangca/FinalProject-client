import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import UserModel from '../models/user';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		    email: '',
		    password: '',
		    show:true
			}
		}

handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

handleSubmit = (event) => {
    event.preventDefault()
    UserModel.login(this.state)
      .then((res) => {
        this.props.setCurrentUser(res.data.data)
        this.props.history.push('/profile')
      })
      .catch((err) => console.log(err))
  }

handleClose=()=>{

  this.props.history.push('/')
}

	render() {
		return (
	<Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>User Login</Modal.Title>
        </Modal.Header>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input onChange={this.handleChange} className="form-control form-control-lg" type="email" id="email" name="email" value={this.state.username} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input onChange={this.handleChange} className="form-control form-control-lg" type="password" id="password" name="password" value={this.state.password} />
              </div>
              <button className="btn btn-primary float-right" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
      </Modal>
		);
	}
}
