import React, { Component } from 'react'
import User from "./UserForm"

class Form extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: '',
			comments: '',
			customer: 'Select customer',
			user: 'Select user',
			dd2: [],
			//data:[],
			selected: "",
			// BBC: [
			// 	{ name: 'Jon' },
			// 	{ name: 'Alex' },
			// 	{ name: 'Bob' },
			// 	{ name: 'Cartin' },
			// 	{ name: 'Teron' },
			// ],
			userData: [],
			data: [
				['ap', 'ron', 'don'],
				['sakib', 'miraz', 'liton'],
				['x', 'y', 'z'],
			]

		}
	}

	selectChange(e) {
		this.setState({ selected: e.target.value });
		this.setState({ dd2: this.state.data.find(x => x.name === e.target.value).data });
	}
	handleUsernameChange = event => {
		this.setState({
			username: event.target.value
		})
	}

	handleCommentsChange = event => {
		this.setState({
			comments: event.target.value
		})
		
	}
	handleCustomerChange = event => {
		this.setState({
			customer: event.target.value
		})
		// if (this.state.customer === 'BBC') {
			this.setState({userData:this.state.data.BBC});
		// }
	}
	handleUserChange = event => {
		this.setState({
			user: event.target.value
		})
	}

	handleSubmit = event => {
		alert(`${this.state.customer} ${this.state.user}`)
		event.preventDefault()
	}
	// componentDidMount()
	// {
	// 	this.setState({
	// 		data: [
	// 			{name : 'BBC', dd2:['ap','ron','don'] },
	// 			{name : 'Aljazeera', dd2:['ap','ron','don']},
	// 			{name : 'BTv', dd2:['ap','ron','don']},
	// 			{name : 'Foxnews', dd2:['ap','ron','don']},
	// 			{name : 'CNN', dd2:['ap','ron','don']},
	// 		]
	// });
	// }
	

	render() {
		const { username, comments, customer, user,userData,data } = this.state
		

		
		return (
			<center>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Select Customer</label>
						<select value={customer} onChange={this.handleCustomerChange}>
							<option value="BBC">BBC</option>
							<option value="CNN">CNN</option>
							<option value="Aljazeera">Aljazeera</option>
							<option value="Foxnews">Foxnews</option>
							<option value="BTv">BTv</option>

						</select>
					</div>
					<div>
						{/* <User customer={customer} user={user} changeHandler = {this.handleUserChange}/> */}

						{/* <label>Select user</label>
						<select value={user} onChange={this.handleUserChange}>
						<option value="BBC">BBC</option>
						<option value="CNN">CNN</option>
						<option value="Aljazeera">Aljazeera</option>
						<option value="Foxnews">Foxnews</option>
						<option value="BTv">BTv</option>
						</select> */}
						<select value={this.state.user} onChange={this.handleUserChange}>
							<option>--------</option>
							{userData.map(x => {
								return <option value={x}>{x}</option>
							})}
						</select>


					</div>
					{/* <div>
				<select >
					<option>-no-</option>
					{this.state.dd2.map(x=>{
						return <option>{x.name}</option>
					})}
				</select>
				</div> */}
					<div>
						<label>Username </label>
						<input
							type="text"
							value={username}
							onChange={this.handleUsernameChange}
						/>
					</div>
					<div>
						<label>Comments</label>
						<textarea
							value={comments}
							onChange={this.handleCommentsChange}
						/>
					</div>

					<button type="submit">Submit</button>
				</form>
			</center>

		)
	}
}

export default Form
