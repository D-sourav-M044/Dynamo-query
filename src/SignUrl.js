
import url from './Url';
import Url from './GetSignUrl';
//"https://wtoitw6jyc.execute-api.ap-northeast-1.amazonaws.com/"
//repeat// 
const url1 = "https://3xei2l4mw3j7ycrln7cbqdyh5i0xkfrr.lambda-url.ap-northeast-1.on.aws/"
const url2 = "https://wtoitw6jyc.execute-api.ap-northeast-1.amazonaws.com/"
export default function SignUrl() {

    // const url = async () => {
    //     const res = await axios.get('https://3xei2l4mw3j7ycrln7cbqdyh5i0xkfrr.lambda-url.ap-northeast-1.on.aws/', {
    //         params: {
    //             key: "name"
    //         }
    //     });
    //     console.log(res.data);
    //     return res.data
    // }
    console.log(url());
    return(
        <div>{url}</div>
    );
    

}