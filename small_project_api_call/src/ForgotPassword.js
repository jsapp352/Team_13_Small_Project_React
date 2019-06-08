import React from "react";
import "./css/styles.css"
import Button from 'react-bootstrap/Button';
import ReactDOM from 'react-dom'
import PasswordReset from './PasswordReset.js'
import Login from "./Login"

class ForgotPassword extends React.Component {
	
	constructor()
	{
		super();
		this.state = {
			username: '',
			securityQuestion: '',
			securityAnswer: '',
			userId:0,
		}
	}

	handleChange = event => {
		this.state.username = event.target.value;
	    this.setState({
	    [event.target.id]: event.target.value
	    });
	}

	handleSubmit = event => {
    	event.preventDefault();
		console.log(this.state.username);
			const url = 'https://murmuring-oasis-54026.herokuapp.com/user/username/' + this.state.username;
		console.log(url);
		const options = {
			method: "GET",
			headers: {"Content-Type": "application/json; charset=UTF-8", "username": [this.state.username]},
		}
		
		fetch(url, options).then(response => response.json()).then(data => {
			this.state.securityAnswer = data.securityAnswer;
			this.state.securityQuestion = data.securityQuestion;
			this.state.userId = data.userId;
			localStorage.setItem('user', JSON.stringify(data))
			console.log(data)
			localStorage.setItem('user', JSON.stringify(this.state))
			ReactDOM.unmountComponentAtNode(document.getElementById('root')); 
	    	ReactDOM.render(<PasswordReset	/>, document.getElementById('root'))
		})
	
  }

	render() {
		var { show, handleClose } = this.props;
		const showHideClassName =  show  ? "pop-outer display-block" : "d-none";

		return (
			<div className={showHideClassName}>
				<div className="pop-inner">
					<div className="modal-header">
						<h5 className="modal-title">Recover Password</h5>
						<button onClick={handleClose} type="button" className="close" aria-label="Close">
              				<span aria-hidden="true">×</span>
            			</button>
					</div>
					<div className="modal-body">
						<form>
							<div className="form-row">
								<div className="col-sm-6">
									<label>Username:</label>
									<input type="text" onChange={this.handleChange} className="form-control" id="username" placeholder="Username" />
								</div>
							</div>
							<div className="text-right">
								<button type="submit" className="btn btn-primary "onClick={this.handleSubmit}>Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default ForgotPassword;
