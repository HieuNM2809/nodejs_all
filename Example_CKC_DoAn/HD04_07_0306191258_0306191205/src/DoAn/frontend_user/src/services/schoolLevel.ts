import { API } from "../config/constans";
import api from "./api";

export class SchoolLevelService {
  static async getSchoolLevels(){
    return await api().get('school-level')
    .then((res)=>{

      return Promise.resolve(res.data)
    })
    .catch((e) => {
      return Promise.reject(e?.response?.data);
    })
  }
}
export default SchoolLevelService