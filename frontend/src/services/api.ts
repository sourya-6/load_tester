import axios from "axios";

export const testApi = async(data:{
    url:string,
    method:string,
    totalRequests:number
}) =>{
    const res = await axios.post("http://localhost:3000/api/test",data);
    return res.data
}