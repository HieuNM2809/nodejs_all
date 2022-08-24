
import { Post } from "models/post";
import { API } from "../config/constans";
import { School } from "../models/school";
import api from "./api";


export class PostService {
 
  static async getPosts(){
    var response = await api().get('post');
    return response.data
  }
  static async getPost(id: String): Promise<any> {
    var response = await api().get('post');
    return response.data.filter((post:Post)=>post._id===id)[0];

  }
  static async getPostsSchool(id:string){
    var response = await api().get(`post/school/${id}`);
    return response.data
  }
  static async getPostsAdmissionsSchool(id:string){
    var response = await api().get(`post/admissions/school/${id}`);
    return response.data
  }
  static async getPostsAdmissionsMajor(id:string){
    var response = await api().get(`post/admissions/major/${id}`);
 
    return response.data
  }
  static async getPostsMajor(id:string){
    var response = await api().get(`post/major/${id}`);
    return response.data
  }
  static async getPostPostType(id:string){
    var response = await api().get(`post/post-type/${id}`);
    return response.data
  }
}
export default PostService