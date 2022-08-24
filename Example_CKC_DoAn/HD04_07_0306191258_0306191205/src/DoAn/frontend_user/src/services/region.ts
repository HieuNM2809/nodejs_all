import { API } from "../config/constans";
import api from "./api";

export class RegionService {
  static async getRegions(){
    return await api().get('region')
    .then((res)=>{

      return Promise.resolve(res.data)
  
    })
    .catch((e) => {
      return Promise.reject(e?.response?.data);
    })
  }
}
export default RegionService