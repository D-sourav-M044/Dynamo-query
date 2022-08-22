import React, { Component } from "react";
import axios from "axios";
const lambdaUrlGet = "https://wtoitw6jyc.execute-api.ap-northeast-1.amazonaws.com/?key=file.txt";
//const lambdaUrlPost = "https://wtoitw6jyc.execute-api.ap-northeast-1.amazonaws.com/submit?key=file.txt";
const lambdaUrlPost = "https://wtoitw6jyc.execute-api.ap-northeast-1.amazonaws.com/submit";
const url= "https://dipto-bucket-serverless.s3.ap-northeast-1.amazonaws.com/input.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAVTLXRYR5DYMZCXN2%2F20220820%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20220820T091204Z&X-Amz-Expires=18000&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0xIkcwRQIhANgNadAcq6M50cPUP2iJ8A%2FzkZu3By6He32eJMz2i6mpAiB%2B%2BdRQC5j9MMAOXWjrR5vchFemIW8n8KF2%2FSpYj2gJ7irAAwhCEAEaDDM4NTE4NzE2OTQwMiIM3eGDRo5lIyTgSooxKp0D0cM0ghmEP7I9XK%2BhdM2F2t2YuV5aNGVawjOBsYqq%2BrF43YywrMquIZ4jqPFIWGaKRKTBTFJ6Ha%2B4HB1CWteGXQBJ390US%2FzXAgWoQ%2FH8%2F6651NuJ2fKJsWuOTu88vzeA32kGHH3daFkgfxFN8CnxapU%2Ba9%2FybVfdZDk4Vx70pQCKrJNjUu6BIMBb6DSbeaVSG0%2FrwMZiW6trBn1DQanNjG%2Bv4lXMpePEbR1zdXRM2S1Hj%2Fbu73bbQFsEgEl5Y9uw4H3R1z2u5CXM8L98Azar5zGUDLxuxkBMG6e8Q3r%2BlMxttmqHRSksUc%2BclacQZAVcwE6%2FYDqGC0eFv1gJ0waALM4igVGezhya2TG%2FHNrjscjbUhhRbj8x6yUM0sZGsR%2FhaHJzhSUPBQirbE0ZOkSnW5t40QVh%2BbZ6bxXeM6ql8G02Ocx95cIp5BcWhEbkEUz8QjeDVmOtDKG1QtpVZ0BEcWPPNFSER%2FPf9g5JUlNvcbODybrN%2B%2FtPNtCWZYc1ElTDABnIAOI7z9f3k3OrbrO%2B%2F%2BaU8H7dQO7Cfrt9YgEwwr6CmAY6ngHU39%2BJbclPEVokqjQdpuXzR8FhwEG0F01hBBxGVYkjmqgN5b%2BLZ2RScziu%2F4v21s00fVk%2FiUstEjtvwIr5L4whOqSPDVWbh6YfBYzbc1Ati8ZlEzPTphgrl37BoIBdgU9fZSErorKJj94%2F2B4JzSE58sNeyAnm34K7XOSGBRCmHHSuOdOhv8j62ume1c0jpOWWscxnTS%2BrUAHpR8G%2BlA%3D%3D&X-Amz-Signature=94ac5d57e0e9dc3e102c736bbbd75a9c3c489cf7b805a5cf4b5ddb6fd479c068&X-Amz-SignedHeaders=host"


class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      users: [],
      selectedCustomer: "--Choose Customer--",
      selectedUser: "--Choose User--",
      file: null,
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
  }
  handleFile = (e) => {
    e.preventDefault();
    console.log();
    let file = e.target.files[0];
    this.setState({ file: file });
  };
  handleSubmit = async (event) => {
    //alert(`${this.state.selectedCustomer} ${this.state.selectedUser}`);
    event.preventDefault();
    console.log(this.state.file);
    const {file, selectedCustomer, selectedUser}=this.state;
    const metaData = {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      customer: selectedCustomer,
      user: selectedUser,
      uploadDate: ''
    }
    //  axios.get(lambdaUrl, {
    //     params: {
    //         key: "file.txt"
    //     }
    // }).then((res)=>{
    //     console.log("url=",res.data);
    //     axios
    //   .put(res.data, this.state.file)
    //   .then((response) => {
    //     console.log("success",response);
    //   })
    //   .catch((error) => {
    //     console.log("error",error);
    //   });
    // });
    // const res = await axios.post(lambdaUrlPost);
    // console.log(res.data);
    const signUrl = await axios.get(lambdaUrlGet);
    //console.log(signUrl);
    await axios.put(signUrl.data,this.state.file);
    const putRes = await axios.post(lambdaUrlPost,metaData);
  };
  
  submitHandler = (e) => {
    e.preventDefault();
    
  };
  render() {
    return (
      <div id="container">
        <h2>File Upload</h2>
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
            <input type="file" name="file" onChange={this.handleFile} />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Dropdown;
