import axiosClient from "../api/axiosClient";

const callAPi = async(endPoint,method,data)=>await axiosClient[method](endPoint,data);

export default callAPi;