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

//-------------image service  api-----------//
const addMenu = async (image) => {
    console.log("inside the service")
    console.log(image)
    const response = await api.put('/api/admin/addMenu', image).catch(error => {
        console.log(error.response);
        return error.response;
    })
    console.log(response);
    return response;
}
const deleteSplMenu = async () => {
    const response = await api.delete('/api/admin/deleteSplMenu/' ).catch(error => {
        console.log(error.response);
        return error.response;
    })
    console.log(response);
    return response;
}
const addSplMenu = async (image) => {
    console.log("inside the service")
    console.log(image)
    const response = await api.put('/api/admin/addSplMenu', image).catch(error => {
        console.log(error.response);
        return error.response;
    })
    console.log(response);
    return response;
}
const getMenu= async () => {
    const response = await api.post('/api/student/getMenu');
    console.log(response);
    return response;
}
const getMenuByFileName = async  (fileName) => {
    const response = await api.post('/api/admin/getMenu/' + fileName);
    console.log(response);
    return response;
}

const imageservice={ addMenu,deleteSplMenu ,addSplMenu,getMenu ,getMenuByFileName}
export default imageservice;
