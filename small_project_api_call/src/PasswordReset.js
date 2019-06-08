import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Login'
import Contacts from "./Contacts"


export default class PasswordReset extends React.Component
{

	constructor()
	{
		super();
		const user = JSON.parse(localStorage.getItem('user'))
		console.log(user);
		this.state = {
			username: user.username,
			securityQuestion: user.securityQuestion,
			securityAnswer: user.securityAnswer,
			firstName: user.firstName,
			lastName: user.lastName,
			userId: user.userId,
			password: "",
			tempFirst: "",
			tempLast: "",
			tempUser: "",
			answer: "",
			newPass: "",
			confirm: "",
		}	

		this.exitPage = this.exitPage.bind(this);
	}

	exitPage()
	{
		localStorage.setItem('user', JSON.this.userify(this.state))
	    ReactDOM.unmountComponentAtNode(document.getElementById('root')); 
	    ReactDOM.render(<Login />, document.getElementById('root'))
	}

	handleChange = event => {
	    this.setState({
	    [event.target.id]: event.target.value
	    });
	}

	handleSubmit = event => {
    event.preventDefault();
 
	if(this.state.securityAnswer === this.state.answer &&
		this.state.newPass === this.state.confirm)
	{
		this.state.password = this.state.newPass;


		const json = {
			  firstName: this.state.firstName,
		  	  lastName: this.state.lastName,
		 	  password: this.state.newPass,
			  securityAnswer: this.state.securityAnswer,
			  securityQuestion: this.state.securityQuestion,
			  userId: this.state.userId,
			  username: this.state.username,
		}





		localStorage.setItem('user', JSON.stringify(this.state))
		console.log("password successfully changed to: " + this.state.newPass)

  		const options = {
	      method : 'PUT',
	      headers: { "Content-Type": "application/json; charset=UTF-8"},
	      body : JSON.stringify(json),
	    };

		const url = 'https://murmuring-oasis-54026.herokuapp.com/user/';
		console.log(url);
	    fetch(url, options)
	            .then(response => response.json())
	      .then(data => {console.log("UPDATED PASSWORD SUCCESS tO:" + data.password ) 

	    	ReactDOM.unmountComponentAtNode(document.getElementById('root')); 
	    	ReactDOM.render(<Login />, document.getElementById('root'))

		}) 
	}
	else
	{
		ReactDOM.unmountComponentAtNode(document.getElementById('root')); 
	    ReactDOM.render(<PasswordReset />, document.getElementById('root'))
	
	}
	
		ReactDOM.unmountComponentAtNode(document.getElementById('root')); 
	    ReactDOM.render(<Login />, document.getElementById('root'))
  }

	render() {
    return(
      <div className="pop-outer"> 
        <div className="pop-inner">
          <div className="modal-header">
            <h5 className="modal-title">Password Reset</h5>
            <button type="button" className="close" aria-label="Close" onClick={this.exitPage}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>First Name</label>
                  <input type="firstName" className="form-control" 
                    id="tempFirst"
                    value={this.state.tempFirst}
                    onChange = {this.handleChange}
                    placeholder="First Name" />
                </div>
                <div className="form-group col-md-6">
                  <label>Last Name</label>
                  <input type="lastName" className="form-control" 
                    id="tempLast"
					name="lastName"
                    value={this.state.tempLast}
                    onChange = {this.handleChange}
                    placeholder="Last Name" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Username</label>
                  <input type="text" className="form-control" 
                    id="tempUser"
                    value={this.state.tempUser}
                    onChange = {this.handleChange}
                    placeholder="Username" />
                </div>
				<div className="form-group col-md-6">
                  <label>New Password</label>
                  <input type="newPass" className="form-control" 
                    id="newPass"
					name="newPass"
                    value={this.state.newPass}
                    onChange = {this.handleChange}
                    placeholder="New Password" />
                </div>
				<div className="form-group col-md-6">
                  <label>Confirm New Password</label>
                  <input type="confirm" className="form-control" 
                    id="confirm"
					name="confirm"
                    value={this.state.confirm}
                    onChange = {this.handleChange}
                    placeholder="Confirm New Password" />
                </div>
              </div>
			<div className="form-row">
                <div className="form-group col-md-6">
                  <label>Answer Question to Reset: <br></br>{this.state.securityQuestion ? this.state.securityQuestion  : "No Security Question on File. Please Contact Customer Service to reset password"}</label>
                  <input type="answer" className="form-control" 
                    id="answer"
                    value={this.state.answer}
                    onChange = {this.handleChange}
                    placeholder="Answer Security Question to Reset" />
                </div>
              </div>
              <br />
              <div className="text-right">
                <button type="submit" className="btn btn-primary"
                  onClick={this.handleSubmit}
                >Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
	}
}
