import React from "react";
import ReactDOM from "react-dom"
import "./css/styles.css"
import "./css/login-style.css"
import avatar from './img/avatar.jpg';
import logo from './img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import Card from './Card.js';
import Table from './Table.js';
import NewContact from './NewContact.js';
import { withRouter } from 'react-router';
import Login from './Login'
import App from './App'

class Contacts extends React.Component {

	constructor(props)
	{
		super(props);

		
		const user = JSON.parse(localStorage.getItem('user'));
		if(props.crit)
		{
			this.state = {
				username: '',
				firstName : '',
				lastName : '',
				userId : user.userId,
				crit : props.crit,
				critPresent: true,
				contacts: [],	
				phone: user.phone,
			}
			console.log(this.state)
		}
		// const option = JSON.parse(localStorage.getItem('option'));
		else
		{
			this.state = {
				username: '',
				firstName : '',
				lastName : '',
				userId : user.userId,
				crit : '',
				critPresent: false,
				contacts: [],	
				phone: user.phone,
			}
		}

		this.state.username = user.username;
		this.state.firstName = user.firstName;
		this.state.lastName = user.lastName;
		this.state.userId = user.userId;
		this.search = this.search.bind(this);
	}
	state = { 
		show: false
	};

  	showModal = () => {
    	this.setState({ show: true });
  	};

  	hideModal = () => {
    	this.setState({ show: false });
  	};

	search()
	{
		if(this.state.crit === '')
		{
			ReactDOM.unmountComponentAtNode(document.getElementById('root'));	
			ReactDOM.render(<Contacts />, document.getElementById('root'))
		}
		else
		{
			this.state.critPresent = true;
			localStorage.setItem("option", JSON.stringify(this.state));
			ReactDOM.unmountComponentAtNode(document.getElementById('root'));	
			ReactDOM.render(<Contacts crit={this.state.crit}/>, document.getElementById('root'))
		}
		
	}

	handleChange = event => {
	    this.setState({
	    [event.target.id]: event.target.value
	    });
		console.log(this.state)
		localStorage.setItem("option", JSON.stringify(this.state));
	}

	componentWillMount()
	{
		let url;
		console.log(url);
	
	
		let options = {};
		if(this.state.crit === '')
		{
			url = 'https://murmuring-oasis-54026.herokuapp.com/contact/userId/' + this.state.userId + '/' ;
			options = {
				method : 'GET',
				headers: { 	"Content-Type": "application/json; charset=UTF-8"},
			}
		}
		else
		{
			console.log('criteria: ' + [this.state.crit])
			url = 'https://murmuring-oasis-54026.herokuapp.com/contact/search/' + this.state.userId + '/' ;
			options = {
				method : 'GET',
				headers: { 	"Content-Type": "application/json; charset=UTF-8", "criteria": [this.state.crit]},
			}
			this.state.critPresent = true;
		}
		fetch(url,options)
		.then(response=>response.json())
		.then(data => {
			this.state.contacts = data;
			console.log(data);
			this.setState({contacts:data})			
		})
	}

	logoutHandler()
	{
        ReactDOM.unmountComponentAtNode(document.getElementById('root'));	
		ReactDOM.render(<App />, document.getElementById('root'))
    }

	render() {	
		return (
			<div className="wrapper">
				<nav id="sidebar" className="sidebar d-none d-sm-none d-md-block">
					<a className="sidebar-brand" href="index.html">
						<img className="logo" src={logo} />
						Contact Manager
					</a>
					<div className="sidebar-content">
						<div className="sidebar-user">
							<img src={avatar} className="img-fluid rounded-circle mb-2" />
							<div className="font-weight-bold">{this.state.username}</div>
							<small></small>
						</div>
						<ul className="sidebar-nav">
							<div className="sidebar-user">
							<div className="font-weight-bold">{this.state.firstName} {this.state.lastName}</div>
							<small></small>
						</div><div className="sidebar-user">
							<div className="font-weight-bold">You're Looking Great Today</div>
							<small></small>
						</div><br/>
						</ul>
					</div>
				</nav>
				<div className="main">
					<nav className="navbar navbar-expand navbar-theme">
						<form className="form-inline my-2 my-lg-0">
  							<input className="form-control mr-sm-2"  id="crit" name="crit" type="crit" value={this.state.crit} onChange={this.handleChange} placeholder="Search" aria-label="Search" />
  							<button className="btn btn-light my-2 my-sm-0" onClick={this.search} type="submit">Search</button>
						</form>
						<div className="navbar-collapse collapse">
							<ul className="navbar-nav ml-auto">
								<li className="nav-item dropdown">
									<a className="nav-link" 
										onClick={this.showModal} 
										id="addContactDropdown" 
										style={{cursor: "pointer", color: "#C7C8C9"}}
										data-toggle="dropdown">
										<FontAwesomeIcon icon={faUserPlus} className="align-middle" />
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" style={{cursor: "pointer", color: "#C7C8C9"}} onClick={this.logoutHandler} id="addContactDropdown"><FontAwesomeIcon icon={faSignOutAlt} className="align-middle" /></a>
								</li>
							</ul>
						</div>
					</nav>
					<main className="content">
						<div className="container-fluid">
							<div className="header text-center">
								<h1 className="header-title">
									Welcome, {this.state.firstName}!
								</h1>
							</div>
							<Table critPresent={this.state.critPresent} crit={this.state.crit}/>
						</div>
					</main>
					<NewContact show={ this.state.show } handleClose={ this.hideModal } />
				</div>
			</div>
		);
	}
}

export default Contacts;
