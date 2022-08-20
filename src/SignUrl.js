import axios from 'axios';
//"https://wtoitw6jyc.execute-api.ap-northeast-1.amazonaws.com/"
export default function SignUrl() {

    const url = async () => {
        const res = await axios.get('https://wtoitw6jyc.execute-api.ap-northeast-1.amazonaws.com/', {
            params: {
                key: "name"
            }
        });
        console.log(res.data);
        return res.data
    }
    console.log(url());
    return(
        <div>"hello "</div>
    );
    

}
