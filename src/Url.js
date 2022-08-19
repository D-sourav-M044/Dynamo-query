import axios from 'axios';
const url = async () => {
    const res = await axios.get('https://3xei2l4mw3j7ycrln7cbqdyh5i0xkfrr.lambda-url.ap-northeast-1.on.aws/', {
        params: {
            key: "name"
        }
    });
    console.log(res.data);
    return res.data
}
export default url;