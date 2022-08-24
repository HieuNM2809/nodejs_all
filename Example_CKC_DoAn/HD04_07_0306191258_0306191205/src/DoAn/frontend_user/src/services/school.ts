
import { API } from "../config/constans";
import { School } from "../models/school";
import api from "./api";


export class SchoolService {
 
  // static async getSchools() {
  //   return await api.get(API.SHOOL.DEFAULT)
  //   .then((res) => {
  //     return Promise.resolve(res.data)
  //   })
  //   .catch((e) => {
  //     return Promise.reject(e?.response?.data);
  //   })
  // }
  static async getSchools(){
    var response = await api().get('school');
    return response.data
  }
  static async getSchoolsOutStanding(){
    var response = await api().get('school/outstanding');
    return response.data
  }
  static async getSchool(id: String): Promise<any> {
    var response = await api().get(`school/${id}`);
return response.data

  }
}
export default SchoolService