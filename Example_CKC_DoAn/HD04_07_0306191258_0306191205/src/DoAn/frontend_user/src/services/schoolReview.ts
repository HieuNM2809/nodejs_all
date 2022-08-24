
import { CreateSchoolReview } from "models/schoolReview";
import { API } from "../config/constans";

import api from "./api";


export class SchoolReviewService {
    static async getSchoolReviews(id: String): Promise<any> {
        var response = await api().get(`school-reviews/${id}`);
    return response.data
   
      }
    static async Review(id:string,data:any){
        return await api().post(`school-reviews/${id}`,data)
        .then((res)=>{
          return Promise.resolve(res.data)
        })
        .catch((e) => {
      
          return Promise.reject(e?.response?.data);
      
        })
      }
}
export default SchoolReviewService