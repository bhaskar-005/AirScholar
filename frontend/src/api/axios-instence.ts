import axios from 'axios';

const axiosInstance = axios.create({});

export const axiosCall =(method:string, url:string, bodyData?:any, headers?:any)=>{
   const res = axiosInstance({
         method: `${method}`,
         url : `${url}`,
         data: bodyData,
         headers: headers
    })
    return res;
}