import React from "react";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      users: [],
      // cities : [],
      selectedCustomer: "--Choose Customer--",
      selectedUser: "--Choose User--",
    };
    this.changeCustomer = this.changeCustomer.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  componentDidMount() {
    this.setState({
      customers: [
        { name: "BBC", users: ["Clark", "Michel", "Alberto", "Deny"] },
        {
          name: "Aljazeera",
          users: ["Charlie", "Dareen", "Marwan", "Richelle"],
        },
        { name: "BTV", users: ["Sakib", "Miraz", "Liton", "Rubel"] },
        { name: "Foxnews", users: ["Adow", "Carey", "Angela", "Ahelbarra"] },
        { name: "CNN", users: ["Jack", "Daniel", "Mickel", "Mark"] },
      ],
    });
  }

  changeCustomer(event) {
    this.setState({ selectedCustomer: event.target.value });
    this.setState({
      users: this.state.customers.find(
        (cntry) => cntry.name === event.target.value
      ).users,
    });
  }

  changeUser(event) {
    this.setState({ selectedUser: event.target.value });
    // const stats = this.state.customers.find(cntry => cntry.name === this.state.selectedCustomer).states;
    // this.setState({cities : stats.find(stat => stat.name === event.target.value).cities});
  }
  handleSubmit = event => {
	alert(`${this.state.selectedCustomer} ${this.state.selectedUser}`)
	event.preventDefault()
}

  render() {
    return (
      <div id="container">
        <h2>Dynamo Table Query</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Customer</label>
          <select
            placeholder="Customer"
            value={this.state.selectedCustomer}
            onChange={this.changeCustomer}
          >
            <option>--Choose Customer--</option>
            {this.state.customers.map((e, key) => {
              return <option key={key}>{e.name}</option>;
            })}
          </select>
          <label>Users</label>
          <select
            placeholder="User"
            value={this.state.selectUser}
            onChange={this.changeUser}
          >
            <option>--Choose user--</option>
            {this.state.users.map((e, key) => {
              return <option key={key}>{e}</option>;
            })}
          </select>
		  <div>
			<button type="submit">Submit</button>
		  </div>
          
        </form>
      </div>
    );
  }
}

export default Dropdown;
