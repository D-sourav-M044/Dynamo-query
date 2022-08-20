import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

function FileUpload() {

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  
  async function handleSubmit(event) {
    //event.preventDefault()
    //const url = 'https://dipto-bucket-serverless.s3.ap-northeast-1.amazonaws.com/input.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAVTLXRYR5DYMZCXN2%2F20220820%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20220820T091204Z&X-Amz-Expires=18000&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0xIkcwRQIhANgNadAcq6M50cPUP2iJ8A%2FzkZu3By6He32eJMz2i6mpAiB%2B%2BdRQC5j9MMAOXWjrR5vchFemIW8n8KF2%2FSpYj2gJ7irAAwhCEAEaDDM4NTE4NzE2OTQwMiIM3eGDRo5lIyTgSooxKp0D0cM0ghmEP7I9XK%2BhdM2F2t2YuV5aNGVawjOBsYqq%2BrF43YywrMquIZ4jqPFIWGaKRKTBTFJ6Ha%2B4HB1CWteGXQBJ390US%2FzXAgWoQ%2FH8%2F6651NuJ2fKJsWuOTu88vzeA32kGHH3daFkgfxFN8CnxapU%2Ba9%2FybVfdZDk4Vx70pQCKrJNjUu6BIMBb6DSbeaVSG0%2FrwMZiW6trBn1DQanNjG%2Bv4lXMpePEbR1zdXRM2S1Hj%2Fbu73bbQFsEgEl5Y9uw4H3R1z2u5CXM8L98Azar5zGUDLxuxkBMG6e8Q3r%2BlMxttmqHRSksUc%2BclacQZAVcwE6%2FYDqGC0eFv1gJ0waALM4igVGezhya2TG%2FHNrjscjbUhhRbj8x6yUM0sZGsR%2FhaHJzhSUPBQirbE0ZOkSnW5t40QVh%2BbZ6bxXeM6ql8G02Ocx95cIp5BcWhEbkEUz8QjeDVmOtDKG1QtpVZ0BEcWPPNFSER%2FPf9g5JUlNvcbODybrN%2B%2FtPNtCWZYc1ElTDABnIAOI7z9f3k3OrbrO%2B%2F%2BaU8H7dQO7Cfrt9YgEwwr6CmAY6ngHU39%2BJbclPEVokqjQdpuXzR8FhwEG0F01hBBxGVYkjmqgN5b%2BLZ2RScziu%2F4v21s00fVk%2FiUstEjtvwIr5L4whOqSPDVWbh6YfBYzbc1Ati8ZlEzPTphgrl37BoIBdgU9fZSErorKJj94%2F2B4JzSE58sNeyAnm34K7XOSGBRCmHHSuOdOhv8j62ume1c0jpOWWscxnTS%2BrUAHpR8G%2BlA%3D%3D&X-Amz-Signature=94ac5d57e0e9dc3e102c736bbbd75a9c3c489cf7b805a5cf4b5ddb6fd479c068&X-Amz-SignedHeaders=host';
    //const url = '/some/api'
    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('fileName', file.name);
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // };
    // axios.post("https//httpbin.org/post").then((response) => {
    //   console.log(response.data);
    // });

    // axios({
    //   url : "https//httpbin.org/post",
    //   method : "POST",
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    //   data : formData
    // }).then((res)=>{

    // })

  }

  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <h1>React File Upload from local</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit" onChange={handleSubmit}>Upload</button>
        </form>
    </div>
  );
}

export default FileUpload;