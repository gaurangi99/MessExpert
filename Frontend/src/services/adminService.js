import axios from "axios";
import configData from './apiConfig.json'
const api = axios.create(
    {
        baseURL : configData['url']
    }
);

const getStudent = async (id) => {
    const response = await api.post(`api/admin/getStudent/${id}`);
    return response;
};

const getallstudent = async ()=>{
    const response = await api.post("api/admin/getAllStudents");
    return response;
};
const addStudent = async (student) =>{
    await api.post("api/admin/addStudent", student);
};


const updateStudent = async (student)=>{
    await api.put("api/admin/updateStudent", student);
}
const deletestudent = async (id) =>{
    await api.delete(`api/admin/deleteStudent/${id}`);
};



const aService = { getStudent,addStudent,getallstudent,deletestudent,updateStudent}
export default aService
