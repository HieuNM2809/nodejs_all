
import { OptionItem } from "models/general";
import api from "./api";






export class CombineService {
 

  static async getCombines(){
    var response = await api().get('combine');
    return response.data
  }
  
  static async getCombine(id: String): Promise<any> {
    var response = await api().get('combine');

    return response.data.filter((combine:OptionItem)=>combine._id===id)[0];

  }


  }

export default CombineService