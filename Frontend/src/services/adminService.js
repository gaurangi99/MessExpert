import axios from "axios";
import configData from './apiConfig.json';
const api = axios.create({
    baseURL: configData['url'],
    headers: {
        "Content-type": "application/json",
        'Access-Control-Allow-Origin': '*'
    }
    });
//---------- appending token for every api call---------//
api.interceptors.request.use(
    config =>{
        const token = localStorage.getItem("token");
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);



//------------------User related services-----------------//
const getUser = async (id) => {
    const response = await api.post(`api/admin/getUserById/${id}`);
    return response;
};


const getUserByRole = async(role)=>{
    const response= await api.post(`api/admin/getUsersByRole/${role}`);
    return response;
}

const getalluser = async ()=>{

    const response = await api.post("api/admin/getAllUsers");
    console.log()
    return response;
};
const addUser = async (user) =>{
   const response= await api.post("api/admin/addUser", user);
   return response;
};


const updateUser = async (user)=>{
   const response= await api.put("api/admin/updateUser", user);
   return response;
};
const deleteuser = async (id) =>{
    const response=await api.delete(`api/admin/deleteUserById/${id}`);
    return response;
};


const getUserByUsername= async(username)=>{
    const response=await api.post(`api/admin/getUserByUsername/${username}`);
    return response;
};


const aService = { getUser,addUser,getalluser,deleteuser,updateUser,getUserByUsername,getUserByRole}
export default aService;
