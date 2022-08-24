
import { Search } from "../models/search";
import api from "./api";

export class SearchService {

  static async search(data:Search){
    var response = await api().post('app/search',data);
    return response.data
  }
}
export default SearchService 