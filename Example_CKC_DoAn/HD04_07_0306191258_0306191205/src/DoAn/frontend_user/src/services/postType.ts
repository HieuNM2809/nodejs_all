
import { OptionItem } from "models/general";
import api from "./api";


export class PostTypeService {
  // static async getSchools() {
  //   return await api.get(API.SHOOL.DEFAULT)
  //   .then((res) => {
  //     return Promise.resolve(res.data)
  //   })
  //   .catch((e) => {
  //     return Promise.reject(e?.response?.data);
  //   })
  // }
  
  static async getPostTypes(){
    return await api().get('post-type')
    .then((res)=>{
      return Promise.resolve(res.data)
    })
    .catch((e) => {
      return Promise.reject(e?.response?.data);
    })
  }

  static async getPostType(id: String): Promise<any> {
    var response = await api().get('post-type');

    return response.data.filter((combine:OptionItem)=>combine._id===id)[0];

  }


}
export default PostTypeService