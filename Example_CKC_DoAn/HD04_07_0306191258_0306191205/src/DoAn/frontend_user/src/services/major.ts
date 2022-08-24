import { Major } from "models/major";
import { API } from "../config/constans";
import { School } from "../models/school";
import api from "./api";

export class MajorService {

  static async getMajors(){
    var response = await api().get('major');
    return response.data
  }
  static async getMajor(id: String): Promise<any> {
    var response = await api().get(`major/${id}`);
    return response.data

  }
  static async getMajorOutStanding(): Promise<any> {
    var response = await api().get('major/outstanding');
    return response.data

  }
  static async getMajorSchool(idSchool: String, idMajor:String): Promise<any> {
    var response = await api().get(`major/${idSchool}/${idMajor}`);
    return response.data
 
  }
}
export default MajorService