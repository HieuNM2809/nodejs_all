

import {createSlice, PayloadAction} from  "@reduxjs/toolkit";
import { Test, TestArray } from "models/test";





const initialTestState:TestArray={
    all_tests:[],
    particular_test:{
        _id: "",
        question: "",
        answerA: "",
        answerB: "",
        answerC: "",
        answerD: "",
        correctAnswer:"",
        combineId:"",
    },
    filter:null,

  
}
const testSlice=createSlice({
    name:'test',
    initialState:initialTestState,
    reducers:{
  
        setParticularTest(state,action:PayloadAction<Test>){
            state.particular_test=action.payload;
        }
    },
    extraReducers:(builder)=>{
        // builder.addCase(fetchTestActions.fulfilled,(state,action:any)=>{
        //     state.all_tests=action.payload;
        // });

    }

})
export default testSlice;