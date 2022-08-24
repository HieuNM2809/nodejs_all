
import { Action, createAsyncThunk } from "@reduxjs/toolkit";
import { Test } from "models/test";

import api from "./api";

export class TestService {

  static async getTests(){
    var response = await api().get('test');
    return response.data
  }

  static async getTest(id: String): Promise<any> {
    var response = await api().get('test');

    return response.data.filter((tes:Test)=>tes._id===id)[0];

  }
  static async getResultTest(idCombine:string,score:number){
    var response = await api().get(`app/combine/${idCombine}/score/${score}`);
    return response.data
  }
  static async getTestCombine(idCombine:string){
    var response = await api().get(`test/combine/${idCombine}`);
    return response.data
  }


  }

export default TestService