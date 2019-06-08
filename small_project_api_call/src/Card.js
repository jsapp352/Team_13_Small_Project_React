import React from "react";
import placeholder from "./img/user.png";
import "./css/styles.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

// var data = [
// 	{ firstName: 'Tony', lastName: 'Giumenta', phone: '123-456-7890', email: 'tony@google.com' },
// 	{ firstName: 'Andy', lastName: 'Tschida', phone: '123-456-7890', email: 'andy@google.com' },
// 	{ firstName: 'Michael', lastName: 'Mignon', phone: '123-456-7890', email: 'michael@google.com' },
// 	{ firstName: 'Justin', lastName: 'Sapp', phone: '123-456-7890', email: 'justin@google.com' },
// 	{ firstName: 'Ivan', lastName: 'Chaffardett', phone: '123-456-7890', email: 'ivan@google.com' },
// 	{ firstName: 'Shady', lastName: 'Saleh', phone: '123-456-7890', email: 'shady@google.com' }
// ];

class Card extends React.Component {

	constructor()
	{
		super();
		const user = JSON.parse(localStorage.getItem('user'));
		this.state = {
			contacts : [],
			userId : user.userId,
			contactData: [],
		}
		this.state.userId = user.userId;
	}
	
	componentWillMount()
	{
		const url = 'https://murmuring-oasis-54026.herokuapp.com/contact/userId/' + this.state.userId + '/' ;
		console.log(url);

		const options = {
			method : 'GET',
			headers: { 	"Content-Type": "application/json; charset=UTF-8"},
			}
		

		fetch(url,options)
		.then(response=>response.json())
		.then(data => {
			this.state.contacts = data;
			this.setState({contacts:data})			
		})
	}

	render() {
		let contacts=[];
		let arr = this.state.contacts;
		arr.forEach((item, index) => {
			contacts.push(
				<div className="col-sm-12 col-lg-6 col-xl-4" key={index}>
					<div className="card w-100">
						<div className="card-body">
							<div className="card-actions float-right">
								<div className="dropdown">
									<a className="drop" href="#" data-toggle="dropdown" data-display="static">
										<FontAwesomeIcon icon={faEllipsisH} />
									</a>
									<div className="dropdown-menu dropdown-menu-right">
										<a className="dropdown-item" href="#">Edit</a>
										<a className="dropdown-item" href="#">Delete</a>
									</div>
								</div>
							</div><br />
							<div className="float-left text-center" style={{width : 35 + "%"}}>
								<img src={placeholder} className="img-fluid rounded-circle mb-2" /><br />
								<small></small>
							</div>
							<div className="float-right" style={{width : 65 + "%"}}>
								<div className="card-item"><b>{item.firstName} {item.lastName}</b></div><br />
								<div className="card-item"><FontAwesomeIcon icon={faPhone} /><span>{item.phone}</span></div>
								<div className="card-item"><FontAwesomeIcon icon={faEnvelope} /><span>{item.email}</span></div>
							</div>
						</div>
					</div>
				</div>
			)
		})

		if (contacts.length <= 0)
		{
			contacts.push(
				<div style={{fontSize: 1.53125 + "em", zIndex: 1, margin: "0 auto", color: "white"}}>
					You have no contacts :(
					<br/><br/><br/><br/><br/>
					<div style={{textAlign: "center", color: '#064474'}}>
						<Button>Add contacts</Button>
					</div>
				</div>
			)
		}

		return (
			<div className="row">
				{contacts}
			</div>
		);
	}
}

export default Card;
