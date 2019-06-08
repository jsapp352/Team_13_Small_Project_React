import React from 'react';
import { Message, Card, Loader} from 'semantic-ui-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ReactDOM from "react-dom"
import Contact from './Contact'

// Constructor Needs to be changed. Waiting to figure out
// How the user will be fetched and stored. For use



// This will be changed. Render method uses imports that can be 
// removed when Ivan finishes jsx
export default class User extends React.Component
{
	constructor(props)
	{
		super(props);
		const user = JSON.parse(localStorage.getItem('user'));
		console.log(user)
		this.state = {
			createDate: "",
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone,
			userId: user.userId,
			username : user.username,
			password : user.password,
			securityQuestion: "",
			securityAnswer: "",
			option: "",
		}
		// console.log("asdnaslknd ::: " + user.userId);
	}
	
	processOptions()
	{
		const op = this.state.option;
		let method = '';
		let extension = '';

		if(op === 'addUser')
		{
			method = 'POST';
			extension = '';
		}	
		else if(op === 'updateUser')
		{
			method = 'PUT';
			extension = '';
		}
		else if(op === 'getUserByUserId')
		{
			method = 'GET';
			extension =  this.state.userId;
		}
		else if(op === 'deleteUser')
		{
			method = 'DELETE';
			extension = this.state.userId;
		}
		else if(op === 'loginUser')
		{
			method = 'POST';
			extension = "login/";
		}
		else if(op === 'getByUsername')
		{
			method = 'GET';
			extension = "username/" + this.state.userId;
		}
		else if(op === 'validateSecurityQuestion')
		{
			method = 'POST';
			extension = "validateSecurityQuestion/";
		}
		
		const url = new URL('//localhost:5000/user/' + extension);		
		console.log(url);
		const options = {
			method : method,
			headers: { "Content-Type": "application/json; charset=UTF-8" },
			body : JSON.stringify(this.state),
		};
		fetch(url, options)
            .then(response => response.json())
			.then(data => {console.log(data)})		
	}

	handleSubmit = event => {
		event.preventDefault();
		// const user = JSON.parse(localStorage.getItem('contact'));
		// console.log(user);
		this.contactControl()
	}
	
	contactControl(event, props)
	{
		event.preventDefault();

		this.setState({
			option: props.op,
		})
		
		localStorage.setItem('contact', JSON.stringify(this.state));
		ReactDOM.unmountComponentAtNode(document.getElementById('root')); 
        ReactDOM.render(<Contact />, document.getElementById('root'));	
	}

	render()
	{
		const title = "Welcome " + this.state.firstName +"!";
		return(
			<MuiThemeProvider>
				<div>
				<AppBar
	             title={title}
	           />
				<RaisedButton label="Get Contact By name" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}/>
				<br></br>
				<RaisedButton label="Add Contact" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}/>
				<br></br>
				<RaisedButton label="Remove Contact" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}/>
				<br></br>
				<RaisedButton label="Update Contact" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}/>
				<br></br>
				<RaisedButton label="Get All Contacts" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}/>
				<br></br>
				<RaisedButton label="Log Out" primary={true} style={style} onClick={(event) => this.handleSubmit(event)}/>
				<br></br>
				</div>
			</MuiThemeProvider>)		
	}

}
const style = {
  margin: 15,
  flex : 1,
};
