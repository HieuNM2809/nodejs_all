

import { SchoolService } from 'services/school';


import {createAsyncThunk, createSlice, PayloadAction} from  "@reduxjs/toolkit";
import { RootState } from "store";

import { fetchCombines } from './combine-actions';
import { OptionItem, OptionItemArray } from 'models/general';

const initialCombineState:OptionItemArray={
    all_options:[],
    particular_option:{
        _id: "",
        name: "",
    }
    ,status:""
}

const combineSlice=createSlice({
    name:'combine',
    initialState:initialCombineState,

    reducers:{
        setCombines(state,action:PayloadAction<OptionItem[]>){
            state.all_options=action.payload;
        },
        setParticularCombine(state,action:PayloadAction<OptionItem>){
            state.particular_option=action.payload;
        },

    },

    extraReducers:(builder)=>{
 
        // builder.addCase(fetchSchoolTest.fulfilled,(state,action:any)=>{
        //     state.all_schools=action.payload;
        // });
        builder.addCase(fetchCombines.pending,(state,action:any)=>{
            state.status = 'loading-combine'
        });
        builder.addCase(fetchCombines.fulfilled,(state,action:any)=>{
            state.all_options=action.payload; 
        });
        builder.addCase(fetchCombines.rejected,(state,action:any)=>{
            state.status = 'fail-combine'
        });

        
     
    }
})
  export const {setCombines} =combineSlice.actions;

export default combineSlice;