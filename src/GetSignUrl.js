import axios from 'axios';
const url1= "https://wtoitw6jyc.execute-api.ap-northeast-1.amazonaws.com/";
// const getUrl = async () => {
//     const res = await axios.get(url1, {
//         params: {
//             key: "name.mp4"
//         }
//     });
//     console.log("heres the link");
//     console.log(res.data);
//     return res.data
// }
// const Url = getUrl();
// export default Url;
export default async function url()
{
    const res = await axios.get(url1, {
                params: {
                    key: "name.mp4"
                }
            });
            //console.log(res.data);
    return res.data;
}