
import api from "./api";
export class MajorReviewService {
    static async getMajorSchoolReviews(idSchool:string,idMajor:string): Promise<any> {
        var response = await api().get(`major-reviews/${idSchool}/${idMajor}`);
    return response.data
   
      }
    static async Review(idSchool:string,idMajor:string,data:any){
        return await api().post(`major-reviews/${idSchool}/${idMajor}`,data)
        .then((res)=>{
          return Promise.resolve(res.data)
        })
        .catch((e) => {
      
          return Promise.reject(e?.response?.data);
      
        })
      }
}
export default MajorReviewService