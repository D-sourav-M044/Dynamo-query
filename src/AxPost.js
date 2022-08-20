import React from "react";
import axios, { Axios } from 'axios';
class AxPost extends React.Component{
  state={
    file:null
  }
  handleFile(e){
    //console.log(e.target.files[0], "#####");
    let file = e.target.files[0];
    this.setState({file:file});
  }
  handleUpload(e)
  {
    console.log(this.state, " ------state----");
    let file = this.state.file;
    let formData = new FormData();
    formData.append('text',file);
    formData.append('name',"test");
    axios({
      url: "https://dipto-bucket-serverless.s3.ap-northeast-1.amazonaws.com/input.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAVTLXRYR5DYMZCXN2%2F20220820%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20220820T091204Z&X-Amz-Expires=18000&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0xIkcwRQIhANgNadAcq6M50cPUP2iJ8A%2FzkZu3By6He32eJMz2i6mpAiB%2B%2BdRQC5j9MMAOXWjrR5vchFemIW8n8KF2%2FSpYj2gJ7irAAwhCEAEaDDM4NTE4NzE2OTQwMiIM3eGDRo5lIyTgSooxKp0D0cM0ghmEP7I9XK%2BhdM2F2t2YuV5aNGVawjOBsYqq%2BrF43YywrMquIZ4jqPFIWGaKRKTBTFJ6Ha%2B4HB1CWteGXQBJ390US%2FzXAgWoQ%2FH8%2F6651NuJ2fKJsWuOTu88vzeA32kGHH3daFkgfxFN8CnxapU%2Ba9%2FybVfdZDk4Vx70pQCKrJNjUu6BIMBb6DSbeaVSG0%2FrwMZiW6trBn1DQanNjG%2Bv4lXMpePEbR1zdXRM2S1Hj%2Fbu73bbQFsEgEl5Y9uw4H3R1z2u5CXM8L98Azar5zGUDLxuxkBMG6e8Q3r%2BlMxttmqHRSksUc%2BclacQZAVcwE6%2FYDqGC0eFv1gJ0waALM4igVGezhya2TG%2FHNrjscjbUhhRbj8x6yUM0sZGsR%2FhaHJzhSUPBQirbE0ZOkSnW5t40QVh%2BbZ6bxXeM6ql8G02Ocx95cIp5BcWhEbkEUz8QjeDVmOtDKG1QtpVZ0BEcWPPNFSER%2FPf9g5JUlNvcbODybrN%2B%2FtPNtCWZYc1ElTDABnIAOI7z9f3k3OrbrO%2B%2F%2BaU8H7dQO7Cfrt9YgEwwr6CmAY6ngHU39%2BJbclPEVokqjQdpuXzR8FhwEG0F01hBBxGVYkjmqgN5b%2BLZ2RScziu%2F4v21s00fVk%2FiUstEjtvwIr5L4whOqSPDVWbh6YfBYzbc1Ati8ZlEzPTphgrl37BoIBdgU9fZSErorKJj94%2F2B4JzSE58sNeyAnm34K7XOSGBRCmHHSuOdOhv8j62ume1c0jpOWWscxnTS%2BrUAHpR8G%2BlA%3D%3D&X-Amz-Signature=94ac5d57e0e9dc3e102c736bbbd75a9c3c489cf7b805a5cf4b5ddb6fd479c068&X-Amz-SignedHeaders=host",
      method: "POST", 
      // headers:{
      //     authorization : "your token"
      // },
      params:{
        'X-Amz-Security-Token': "IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0xIkcwRQIhAMIRZS%2B8UHPNT8aTDERlgPH0rJMcVEtXbFqN%2FP%2BHATy%2BAiA0Lc2%2ByCZK3nMBHG6okTywEHWCSM2oXRztZH3OvCjztirAAwg%2BEAEaDDM4NTE4NzE2OTQwMiIMP2tXxwfkaQW97H4jKp0DeC%2FksFLuxUTlvGxo3aYggkZ9IZFAyE%2FOLT%2FBjqbnjxFzC9Ca0bfFVhaeYzbxW%2BxpVhM4%2BDp1yI2rXp3V1fjfckw1hWtS1kqkhEg2LB%2FsePLwqLphrUVaSrSFTxq4r2Q0xX5LeZ1xPjNO8iMi7TnlCYfQW%2F4AQP8hKh1IdET%2FLkwdUvzhYFloUHO9DjmER8UKQE6F4PGj0yNFp8YAN%2Fpl6HJdnZzST9rD5j3mg1xYSDldjSf0ssw5LiNpUTxYWsbioIT7GZUV5dPpaWNPn8ioboeSfM3S87lcCx0F4SOb46lan2E3OQVe%2BLXm9qDW3%2BVqeRtfA6dkSWtaLIiZJqGtNiFv1yTsrq4TsG9gkyeKTYoMMG5TJAvQtEP17Jr8O6f46G73oQt%2B2B9NirOpGHd6HpRu%2FMusJNh1G9wqd80cTHYJ%2FNxnuuU0RRHt4pevumjw%2BeyAG1FL6Xh%2B2nYuw1dLzOVtKrP%2BM9fY0%2Fe83HXkw53rzwyGCLgesVukVK38iKVFhLUJjk8G5rfR71bTf5iXHQpa9MJVwfJXE63M6bwwptmBmAY6ngFmCcem%2BI0E3sfDKy%2B5FhQdAKzCcbKXhdR68YnKm7jhxhx4QDi%2B8W7V5Y2pdWOW0vav4RNoNvf7pAlwgPbCxHmSHSCryR%2BCHtIeI7h8jstIaqRS7AiCKB0PKeegTy%2BFZP0ciVTEd%2B7ix%2BKKkV3DhEBU3QPbSin0rQuRyD90YCZOerOksZX7c2wi%2FysyODZ8neNAdLw%2B4n9qPJUyQARg1g%3D%3D",
        'X-Amz-Signature': "eda70154b63c8f272318c2e518b3357c94eb3db63e4fc5b3e9d9fb57c13bcf69",
        'X-Amz-SignedHeaders': 'host'
      },
      data: formData
    }).then((res)=>{
      console.log(res);
    })
  }
  render(){
    return(
      <form>
    <div>
      <input type="file" multiple name="file" onChange={(e)=>this.handleFile(e)} />
      <button type="button" onClick={(e)=>{this.handleUpload(e)}}> FileUpload </button>
    </div>
  </form>
    );
  }
}
export default AxPost;